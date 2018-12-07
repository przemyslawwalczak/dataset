const Winston = require('winston')
const Path = require('path')
const Environment = require('@application/environment')

require('@application/daily-transporter')
require('@application/pretty-transporter')

class Logger {
  constructor(namespace) {
    let transports = []
    
    if (Environment.current === 'development') {
      transports.push(new Winston.transports.PrettyConsole({
        namespace: namespace
      }))
    }

    transports.push(new Winston.transports.DailyFile(Path.literal('@logs/', namespace), {
      level: 'info',
      formatter: (data) => {
        data.timestamp = new Date()
        return data
      }
    }))

    transports.push(new Winston.transports.DailyFile(Path.literal('@logs/', namespace), {
      level: 'warn',
      formatter: (data) => {
        data.timestamp = new Date()
        return data
      }
    }))

    transports.push(new Winston.transports.DailyFile(Path.literal('@logs/', namespace), {
      level: 'error',
      formatter: (data) => {
        return {
          error: data.message,
          stack: data.stack,
          timestamp: new Date()
        }
      }
    }))

    let logger = Winston.createLogger({
      level: 'info',
      transports: transports
    })

    for (let name of Object.keys(logger)) {
      this[name] = logger[name]
    }
  }
}

module.exports = Logger