require('literal-require')

const Path = require('path')
const http = require('http')

const express = require('express')
const Application = require('@application')

const { Logger } = Application

const Util = require('util')

const server = express()

server.use(Application.router)

const instance = http.createServer(server)

instance.listen(Application.attribute.port, Application.attribute.host, () => {
  let address = instance.address()

  Logger.info(Util.format('Dataset listening: %s:%s', address.address, address.port))
})
