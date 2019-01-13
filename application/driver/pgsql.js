const Connection = require('@application/connection')
const pg = require('pg')
const moment = require('moment')

// pg.types.setTypeParser(1114, str => str)

class Expression {
  constructor(table, value) {
    this.table = table
    this.value = value
    this.comparison_operator
    this.null_operator
  }

  comparison(operator) {
    this.comparison_operator = operator
  }

  null(operator) {
    this.null_operator = operator
  }

  result(index) {
    // TODO: Trim operators
    if (this.value === null || this.value === undefined) {
      return this.table + ' ' + this.null_operator
    } else {
      return this.table + ' ' + this.comparison_operator + ' $' + index
    }
  }

  push(array) {
    if (this.value !== null && this.value !== undefined) {
      array.push(this.value)
      return true
    }
    
    return false
  }
}

class PgSql extends Connection {
  constructor(option) {
    super(option)

    this.pool = new pg.Pool(this.option)
  }

  fetch_datakey(key, data) {
    let keys = key.split('.')

    for (let key of keys) {
      let property = data[key]

      if (!property) {
        return property
      }

      if (Object.prototype.toString.call(property) === '[object Date]') {
        return moment.utc(property).format('YYYY-MM-DD HH:mm:ss')
      }

      if (typeof property === 'object') {
        data = property
      } else {
        return property
      }
    }

    return data[key]
  }

  prepare(script, data) {
    let index = 1
    let array = []
    let literal
    while (literal = script.match(/\$\{\s*([^\s\}]+)\s*\}/)) {
      let [l, command] = literal

      let expression = data[command]

      if (expression instanceof Expression) {
        script = script.replace(l, `${expression.result(index)}`)
        
        if (expression.push(array)) {
          index++
        }
      } else {
        array.push(this.fetch_datakey(command, data))
        script = script.replace(l, `$${index++}`)
      }
    }

    return [script, array]
  }

  async query(script, data = {}) {
    let client = await this.pool.connect()

    let result = await client.query.apply(client, this.prepare(script, data))

    client.release()

    return result
  }

  async client() {
    return await this.pool.connect()
  }

  async transaction(sandbox) {
    let client = await this.pool.connect()

    let finalized = false

    await client.query('BEGIN')
    
    let transaction = {
      finalized: () => {
        return finalized
      },

      commit: async () => {
        if (finalized) return

        let result = await client.query('COMMIT')
        client.release()

        finalized = true

        return result
      },

      rollback: async () => {
        if (finalized) return
        
        let result = await client.query('rollback')
        client.release()

        finalized = true

        return result
      },

      release: () => {
        if (finalized) return
        
        let result = client.release()

        finalized = true

        return result
      },

      query: new Proxy({}, {
        get: (object, property) => {
          if (typeof property === 'symbol') {
            return property
          }

          if (object.hasOwnProperty(property)) {
            return object[property]
          }

          return async (data) => {
            let script = sandbox.Script[property]

            if (!script) {
              throw new Error(`Script (${property}) is undefined`)
            }

            try {
              return await client.query.apply(client, this.prepare(script, data))
            } catch (exception) {
              throw new Error('Query Exception (' + property + '): ' + exception.message)
            } 
          }
        }
      })

    }

    sandbox._transaction.push(transaction)

    return transaction 
  }

}

module.exports = PgSql
module.exports.Expression = Expression