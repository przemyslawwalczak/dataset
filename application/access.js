class Access {
  constructor(options) {
    this.option = options || {}
  }

  async validate(request) {
    // TODO: Use Exception class
    throw new Error('Undefined method async access.validate')
  }
}

module.exports = Access