require('literal-require')

const Path = require('path')
const http = require('http')
const https = require('https')

const express = require('express')
const Application = require('@application')

const { Logger } = Application

const Util = require('util')

const server = express()

server.use(Application.router)

let instance

if (true) {
  instance = http.createServer(server)
} else {
  instance = http.createServer(server)
}

instance.listen(Application.attribute.port, Application.attribute.host, () => {
  let address = instance.address()

  Logger.info(Util.format('Dataset listening: %s:%s', address.address, address.port))

  let raised_application_error = false

  process.on('uncaughtException', (exception) => {
    Logger.error(exception)

    if (raised_application_error) {
      return
    }

    raised_application_error = true

    let server_stack = server._router.stack

    for (let layer of server_stack) {
      if (layer.name === 'router') {
        server_stack.splice(server_stack.indexOf(layer), 1)
      }
    }

    server.use('/favicon.ico', (request, response) => {
      response.status(501).end()
    })

    server.use((request, response) => {
      response.status(200).json({
        error: 'Application was stopped due to a critical error. Contact your administrator'
      })
    })
  })
})

