

const { CustomError } = require('./error.utils')

module.exports.createCustomError = (status, message) => {
  return new CustomError(status, message)
}

module.exports.editFields = (obj1, obj2, fields) => {
  fields.forEach(field => {
    const o0 = field[0]
    const o1 = field[1]
    obj1[o0] = obj2[o1]
  })
}