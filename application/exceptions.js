const Environment = require('@application/environment')
const Util = require('util')
const _ = require('lodash')

class Exceptions {
  constructor(directory, parent) {
    _.merge(this, parent)

    let exceptions = new Environment.Yaml(directory, 'exceptions')

    this._codes = new Environment.Yaml(directory, 'codes')
    
    if (parent) {
      this._codes = new _.merge(parent._codes || {}, new Environment.Yaml(directory, 'codes'))
    }

    for (let name in exceptions) {
      this[name] = (...data) => {
        let error = new Error(Util.format.apply(Util, [exceptions[name], ...data]))

        error.status = this._codes[name]

        throw error
      }
    }

  }
}

module.exports = Exceptions