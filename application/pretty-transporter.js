const Transporter = require('winston-transport')
const Winston = require('winston')

class PrettyTransporter extends Transporter {
  constructor(options = {}) {
    super(options)

    this.namespace = options.namespace || null

    if (this.namespace) {
      this.namespace = this.namespace.toUpperCase()
    }
  }

  log(data, callback) {
    switch (data.level) {
      case 'error':
      console.log('\x1b[31m[' + this.namespace + '][' + data.level.toUpperCase() + ']\x1b[0m: ' + data.message)
      console.log(data.stack)
      break

      case 'warn':
      console.log('\x1b[33m[' + this.namespace + '][ ' + data.level.toUpperCase() + ']\x1b[0m: ' + data.message)
      break

      default:
      console.log('\x1b[34m[' + this.namespace + '][ ' + data.level.toUpperCase() + ']\x1b[0m: ' + data.message)
      break
    }

    callback()
  }
}

Winston.transports.PrettyConsole = PrettyTransporter