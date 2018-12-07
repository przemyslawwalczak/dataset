const fs = require('fs')
const Path = require('path')

class File {
  static walkSync(directory, options = {}) {
    let result = []

    for (let file of fs.readdirSync(directory)) {
      let absolute = Path.join(directory, file)
      let stat = fs.statSync(absolute)

      if (stat.isDirectory() && options.recursion) {
        result = result.concat(File.walkSync(absolute, options))
      } else {
        result.push(absolute)
      }
    }

    return result
  }
}

module.exports = File