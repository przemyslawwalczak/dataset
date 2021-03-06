const yaml = require('js-yaml')
const fs = require('fs')
const Path = require('path')

const CONFIG_PATH = Path.literal('@data/application.yaml')
const express = require('express')

const Environment = require('@application/environment')

const Exception = module.exports.Exception = new (require('@application/exceptions'))(Path.literal('@data'))
const Logger = module.exports.Logger = new (require('@application/logger'))('application')

const Router = express.Router()

const Version = require('@application/version')

const BodyParser = require('body-parser')

Router.use('/favicon.ico', (request, response) => {
  response.status(501).end()
})

const cookie_parser = require('cookie-parser')

Router.use(cookie_parser())
Router.use(BodyParser.urlencoded({ extended: false }))
Router.use(BodyParser.json())

Router.use((request, response, next) => {
  request.full_url = request.url
  request.form = request.body || {}
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

module.exports.attribute = new Environment.Yaml(Path.literal('@data', 'application'))