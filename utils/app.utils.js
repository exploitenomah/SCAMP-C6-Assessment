

const { CustomError } = require('./error.utils')

module.exports.createCustomError = (status, message) => {
  return new CustomError(status, message)
}
