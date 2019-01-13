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

const living_connections = []

instance.on('connection', socket => {
  living_connections.push(socket)

  socket.on('close', () => {
    living_connections.splice(living_connections.indexOf(socket), 1)
  })
})

instance.listen(Application.attribute.port, Application.attribute.host, () => {
  let address = instance.address()

  Logger.info(Util.format('Dataset listening: %s:%s', address.address, address.port))

  let APPLICATION_CRITICAL_ERROR = false

  process.on('uncaughtException', (exception) => {
    Logger.error(exception)

    if (APPLICATION_CRITICAL_ERROR) {
      return
    }

    APPLICATION_CRITICAL_ERROR = true

    for (let socket of living_connections) {
      socket.destroy()
    }

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

