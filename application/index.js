const yaml = require('js-yaml')
const fs = require('fs')
const Path = require('path')

const CONFIG_PATH = Path.literal('@data/application.yaml')
const express = require('express')

const Exception = module.exports.Exception = new (require('@application/exceptions'))(Path.literal('@data'))
const Logger = module.exports.Logger = new (require('@application/logger'))('application')

const Router = express.Router()

const Version = require('@application/version')

const BodyParser = require('body-parser')

const Winston = require('winston')

Router.use('/favicon.ico', (request, response) => {
  response.status(501).end()
})

Router.use(BodyParser.urlencoded({ extended: false }))
Router.use(BodyParser.json())

Router.use((request, response, next) => {
  request.full_url = request.url
  next()
})

Version.each((version) => {
  Router.use(version.route, version.router)
})

Router.use((request) => {
  throw Exception.REQUEST_NOT_FOUND(request.method, request.full_url)
})

Router.use((exception, request, response, next) => {
  Logger.error(exception)

  response.status(exception.status || 400).json({
    error: exception.message,
    code: exception.code
  })
})

module.exports.router = Router

module.exports.attribute = yaml.safeLoad(fs.readFileSync(CONFIG_PATH, 'utf8'))