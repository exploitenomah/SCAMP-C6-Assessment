
const EmailHandler = require('./email.utils')

const { CustomError } = require('./error.utils')

module.exports.createCustomError = (status, message) => {
  return new CustomError(status, message)
}

module.exports.editFields = (obj1, obj2, fields) => {
  fields.forEach(field => {
    const f0 = field[0]
    const f1 = field[1]
    obj1[f0] = obj2[f1]
  })
}

module.exports.sendEmail = async (mailOptions, template, options, locals) => {
  return await new EmailHandler(mailOptions, template, options, locals).generateTxtAndHTML().sendEmail()
}
module.exports.createResponse = (res, status, data) => {
  return res.status(status).json({
    data
  })
}