class Sandbox {
  constructor(version, request) {
    this.require = require
    this.console = console
    this.Form = request.body || {}

    this.Exception = version.exceptions
    this.Logger = version.Logger
    this.Access = version.access

    this.Connection = version.default_connection
    this.Connections = version.connection

    this.Query = version.query
    this.Script = version.script

    this._transaction = []

    for (let object of Object.keys(Sandbox)) {
      this[object] = Sandbox[object]
    }

    for (let object of Object.keys(version.sandbox)) {
      this[object] = version.sandbox[object]
    }
  }
}

module.exports = Sandbox
