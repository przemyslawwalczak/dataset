const list = process.argv.slice(2)
const fs = require('fs')
const Path = require('path')

const DATA_REGEXP = new RegExp(/\Data for Name: ([-a-zA-Z_0-9]+); Type: ([-a-zA-Z_0-9 ]+); Schema: ([-a-zA-Z_0-9]+);/)

for (let table of list) {
  let filename = Path.join(process.cwd(), 'bin', table + '.sql')
  let script = fs.readFileSync(filename, 'utf8')
  let lines = script.split(/\r?\n/)

  for (let index=0; index<lines.length; index++) {
    let line = lines[index]

    let result = DATA_REGEXP.exec(line)

    if (result) {
      let schema = result[3]
      let insert_index = index - 2
      
      if (!insert_index) {
        insert_index = 0
      }

      let rows = [
        '',
        '--',
        '-- Table truncation',
        '--',
        '',
        `TRUNCATE ${schema}.${table};`
      ]

      lines.splice.apply(lines, [insert_index, 0, ...rows])

      index += rows.length
    }
  }

  fs.writeFileSync(filename, lines.join('\n'))
}

