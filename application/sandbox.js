class Sandbox {
  constructor(version, request) {
    this.require = require
    this.console = console
    this.Form = request.body || {}

    this.Exception = version.exceptions
    this.Logger = version.Logger

    for (let object of Object.keys(Sandbox)) {
      this[object] = Sandbox[object]
    }

    for (let object of Object.keys(version.sandbox)) {
      this[object] = version.sandbox[object]
    }
  }
}

module.exports = Sandbox
