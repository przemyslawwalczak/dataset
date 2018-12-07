const File = require('@application/file')
const Path = require('path')
const vm = require('vm')
const fs = require('fs')

class Request {
  constructor(filename, version) {
    let file = Path.parse(filename)

    this.version = version
    this.route = '/' + Path.join( file.dir, ((file.name === 'index') ? '' : file.name) ).replace(/\\/g, '/')

    this.script = new vm.Script(fs.readFileSync(Path.join(version.api.directory, filename), 'utf8'))
  }
}

class Api {
  constructor(directory, version) {
    console.log('reading directory api:', directory)

    this.directory = directory
    this.version = version

    version.api = this

    this.routes = []

    for (let filename of File.walkSync(directory, { recursion: true })) {
      let file = Path.parse(filename)

      if (['.js'].indexOf(file.ext) === -1) {
        continue
      }

      this.routes.push(new Request(filename.replace(directory, ''), version))
    }
  }

  bind(router) {
    for (let Request of this.routes) {
      router.use(Request.route, (request, response, next) => {
        request.sandbox = new Request.version.sandbox(Request.version, request)

        Request.script.runInNewContext(request.sandbox)

        let method = request.sandbox[request.method]

        if (!method) {
          throw new Error(`No request method (${request.method}) is defined for route: ${request.full_url}`)
        }

        Promise.resolve(method(request))
        .then(result => {
          // TODO: Switch between different types
        
          response.status(200).json(result)
        })
        .catch(next)
        .finally(() => {
          delete request.sandbox
        })
      })
    }

    router.use((exception, request, response, next) => {
      this.version.Logger.error(exception)

      response.status(exception.status || 400).json({
        error: exception.message,
        code: exception.code
      })
    })
  }
}

module.exports = Api