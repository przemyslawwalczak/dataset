const fs = require('fs')
const Path = require('path')

const Environment = require('@application/environment')
const Api = require('@application/api')
const Exceptions = require('@application/exceptions')
const Logger = require('@application/logger')

const Application = require('@application')

const express = require('express')

const table = []

let directory = Path.literal('@data')

class Version {
  constructor(namespace) {
    this.directory = Path.join(directory, namespace)
    this.attribute = new Environment.Yaml(this.directory, namespace)

    this.route = '/' + namespace

    this.router = express.Router()

    this.sandbox = new Environment.File(Path.join(this.directory, namespace), '.js')

    this.exceptions = new Exceptions(this.directory, Application.Exception)

    this.Logger = new Logger(namespace)

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