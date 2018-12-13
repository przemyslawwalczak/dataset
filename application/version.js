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

    for (let namespace in access_table) {
      let access = access_table[namespace]
      let options = access.option
      let driver = Path.join(access_drivers, access.driver)

      this.access[namespace] = new (require( driver ))(options)
    }

    // for ( let file of File.walkSync() ) {
    //   console.log(driver)
    //   let configu
    //   let driver = new (require(file))()
    // }

    // console.log(access_drivers)

    // for (let file of )) {
    //   let object = Path.parse(file)
    //   let configuration = 
    //   let access = new (require(file))(configuration)

    //   this.access[object.name] = (sandbox) => {
    //     return new (require(file))()
    //   }
    // }

    this.query = {}

    // for (let file of File.walkSync(Path.join(directory, namespace, 'query'))) {
    //   let object = Path.parse(file)

    //   this.query[object.name] = (sandbox) => {
    //     return new (require(file))(sandbox)
    //   }
    // }

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