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
      fs.accessSync(file, fs.constants.F_OK)
    } catch(e) {
      return {}
    }

    let contents = yaml.safeLoad(fs.readFileSync(file))

    if (fs.existsSync(environmental)) {
      _.merge(contents, yaml.safeLoad(fs.readFileSync(environmental)))
    }

    return contents
  }
}


// TODO: Switch between environments?
// And reload references perhaps?