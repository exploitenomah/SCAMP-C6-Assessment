
const EmailHandler = require('./email.utils')

const { CustomError } = require('./error.utils')

module.exports.createCustomError = (status, message) => {
  return new CustomError(status, message)
}
module.exports.createResponse = (res, status, data) => {
  return res.status(status).json({
    data
  })
}
module.exports.editFields = (obj1, obj2, fields) => {
  fields.forEach(field => {
    const f0 = field[0]
    const f1 = field[1]
    obj1[f0] = obj2[f1]
  })
}
const sendEmail = async (mailOptions, template, options, locals) => {
  return await new EmailHandler(mailOptions, template, options, locals).generateTxtAndHTML().sendEmail()
}
module.exports.sendEmail = sendEmail

const emailInvoice = async (invoice, template) => {
  const mailOptions = {
    from: invoice.supplier.email,
    to: invoice.client.email,
    subject: `Invoice for ${invoice.service}`
  }
  const options = {invoice, title: `Invoice for ${invoice.service}`}
  await sendEmail(mailOptions, template, options, {})
  invoice.lastReminder = Date.now()
  await invoice.save({validateBeforeSave: false})
  return {message: 'Invoice sent successfully.'}
} 
module.exports.emailInvoice = emailInvoice

module.exports.createResponse = (res, status, data) => {
  return res.status(status).json({
    data
  })
}