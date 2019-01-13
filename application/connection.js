class Connection {
  constructor(configuration) {
    this.option = configuration
  }

  async query(filename, data = {}) {
    throw new Error('Query not defined')
  }
}

module.exports = Connection