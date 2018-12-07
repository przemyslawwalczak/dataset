const Transporter = require('winston-transport')
const Winston = require('winston')
const fs = require('fs')
const Path = require('path')
const moment = require('moment')

const fse = require('fs-extra')

// Winston.transports.File
// Create new stream if one of these are true:
// Date changed
// Filesize exceeded

class DailyTransporter extends Transporter {
  constructor(filename, options = {}) {
    super(options)

    this.filesize
    this.stream

    this.limit = options.limit || 1024 * 1000 * 10 // Default 10mb
    this.date_pattern = options.date_pattern || 'YYYY-MM-DD'
    this.extension = options.extension || '.log'

    this.current_date
    this.filename = filename
    this.formatted_filename
    this.index = 0

    this.formatter = options.formatter || null

    fse.ensureDirSync(filename)
    
    this.create_stream()
  }

  format_date() {
    return moment.utc().format(this.date_pattern)
  }

  format_filename(index = 0) {
    return this.filename + Path.sep + this.current_date + (this.level && this.level !== 'info' ? '.' + this.level : '') + '.' + index + this.extension
  }

  split() {
    return this.filesize === undefined || this.filesize >= this.limit || this.format_date() !== this.current_date
  }

  create_stream() {
    if (!this.stream || this.split()) {
      this.current_date = this.format_date()
      this.formatted_filename = this.format_filename()

      try {
        fs.accessSync(this.formatted_filename, fs.constants.R_OK | fs.constants.W_OK)
      } catch(e) {
        this.filesize = 0
        
        return this.stream = fs.createWriteStream(this.formatted_filename)
      }

      let stats = fs.statSync(this.formatted_filename)

      this.filesize = stats.size

      if (this.filesize >= this.limit) {
        let index = 1

        let formatted_filename = this.format_filename(index)

        try {
          while (!fs.accessSync(formatted_filename, fs.constants.R_OK | fs.constants.W_OK)) {
            let stats = fs.statSync(formatted_filename)

            if (stats.size < this.limit) {
              this.filesize = stats.size

              throw new Error('File still has space for logs')
            }

            formatted_filename = this.format_filename(++index)
          }
        } catch(e) {
          this.formatted_filename = formatted_filename
        }
      }

      if (!this.filesize) {
        this.filesize = 0
      }

      this.stream = fs.createWriteStream(this.formatted_filename, {
        flags: 'a'
      })
    }
  }

  log(data, callback) {
    if (!this.stream) {
      throw new Error('Stream for file (' + this.formatted_filename + ') is not defined!')
    }

    if (this.level && data.level !== this.level) {
      return callback()
    }

    if (this.formatter) {
      data = this.formatter(data)
    }

    this.stream.write(JSON.stringify(data) + "\r\n", (error) => {
      this.filesize += this.stream.bytesWritten

      if (this.split()) {
        this.stream.end()
        this.create_stream()
      }

      callback()
    })
  }
}

Winston.transports.DailyFile = DailyTransporter