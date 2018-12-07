const Path = require('path')
const argv = require('yargs').argv
const environment = argv.env || 'development'
const fs = require('fs')
const _ = require('lodash')
const yaml = require('js-yaml')

module.exports.current = environment

module.exports.File = class EnvironmentFile {
  constructor(pathname, extension) {
    let environmental = pathname + '.' + environment + extension
    
    pathname += extension

    try {
      return require(environmental)
    } catch(e) {
      return require(pathname)
    }
  }
}

module.exports.Yaml = class EnvironmentYaml {
  constructor(...path) {
    let file = Path.join.apply(Path, path)

    let environmental = file + '.' + environment + '.yaml'

    file += '.yaml'

    try {
      fs.accessSync(file, fs.constants.R_OK)
    } catch(e) {
      try {
        let destination_file = Path.join.apply(Path, path) + '.dist.yaml'

        fs.accessSync(destination_file, fs.constants.R_OK)

        file = destination_file
      } catch(e) {

        return {}
      }
    }

    let contents = yaml.safeLoad(fs.readFileSync(file))

    try {
      fs.accessSync(environmental, fs.constants.F_OK)
      _.merge(contents, yaml.safeLoad(fs.readFileSync(environmental)))
    } catch(e) {}

    return contents
  }
}


// TODO: Switch between environments?
// And reload references perhaps?