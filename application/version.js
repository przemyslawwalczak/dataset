const fs = require('fs')
const Path = require('path')
const vm = require('vm')

const Environment = require('@application/environment')
const File = require('@application/file')
const Api = require('@application/api')
const Exceptions = require('@application/exceptions')
const Logger = require('@application/logger')

const Application = require('@application')

const express = require('express')

const table = []

let directory = Path.literal('@data')

class Version {
  constructor(namespace) {
    this.namespace = namespace

    this.directory = Path.join(directory, namespace)

    require('literal-require').add('@' + namespace, this.directory)

    this.attribute = new Environment.Yaml(this.directory, namespace)

    this.route = '/' + namespace

    this.router = express.Router()

    this.access = {}

    let access_table = this.attribute.access || {}
    let access_drivers = Path.join(directory, namespace, 'access')

    this.Logger = new Logger(namespace)

    for (let namespace in access_table) {
      let access = access_table[namespace]
      let options = access.option
      let driver = Path.join(access_drivers, access.driver)

      this.access[namespace] = new (require( driver ))(options, this.Logger)
    }

    this.connection = {}

    let connection_table = this.attribute.connection || {}
    
    for (let id in connection_table) {
      let connection = connection_table[id]
      let driver = require(Path.literal('@application', 'driver', connection.driver))

      this.connection[id] = new driver(connection.option || {})
    }

    this.default_connection = this.connection[this.attribute.default.connection]

    let queries_directory = Path.join(directory, namespace, 'query')
    let queries = fs.readdirSync(queries_directory)

    this.query = {}
    this.script = {}

    for (let query of queries) {
      let file = Path.parse(query)

      let namespace = file.name.toUpperCase().replace(/\-/g, '_')

      let script = this.script[namespace] = fs.readFileSync(Path.join(queries_directory, query), 'utf8')

      script = script.replace(/--(.*?)\r?\n/g, '')

      this.query[namespace] = async (data = {}) => {
        return await this.default_connection.query(script, data)
      }
    }

    this.sandbox = new Environment.File(Path.join(this.directory, namespace), '.js')

    this.exceptions = new Exceptions(this.directory, Application.Exception)

    new Api(Path.join(this.directory, 'api', Path.sep), this).bind(this.router)
  }
}

let index = fs.readdirSync(directory)

for (let name of index) {
  let stat = fs.statSync(Path.join(directory, name))

  let result
  if ( stat.isDirectory() && (result = name.match(/v[0-9]+/)) ) {
    let [match] = result

    if (match === name) {
      table.push(new Version(name))
    }
  }

  delete result
}

class Versioning {
  static each(handler) {
    for (let version of table) {
      handler(version)
    }
  }
}

module.exports = Versioning