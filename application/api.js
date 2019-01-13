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
        request.version = this.version
        request.sandbox = new Request.version.sandbox(Request.version, request)

        if (request.sandbox.prepare) {
          Promise.resolve(request.sandbox.prepare(request, response))
          .then(() => {
            next()
          })
          .catch(next)
        } else {
          next()
        }
      })

      router.use(Request.route, (request, response, next) => {
        Request.script.runInNewContext(request.sandbox)

        let method = request.sandbox[request.method]

        if (!method) {
          throw new Error(`No request method (${request.method}) is defined for route: ${request.full_url}`)
        }

        Promise.resolve(method(request, response))
        .then(async (result) => {
          if (request.sandbox.deconstructor) {
            await Promise.resolve(request.sandbox.deconstructor(request, response))
          }

          request.result = result
        })
        .catch(next)
        .finally(async () => {
          if (request.sandbox.finally) {
            await Promise.resolve(request.sandbox.finally(request, response))
          }

          for (let transaction of request.sandbox._transaction) {
            if (!transaction.finalized()) {
              console.log('transaction rollbacked')
              
              transaction.rollback()
            }
          }

          delete request.sandbox

          // TODO: Switch between different types
          if (!response.headerSent) {
            response.status(200).json(request.result)
          }          
        })
        .catch(next)
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