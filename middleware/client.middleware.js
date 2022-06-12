
const Client = require('../models/client.model')
const Invoice = require('../models/invoice.model')
const { asyncHelper, singArgAsync } = require('../utils/async.utils')
const { editFields,  createCustomError, sendEmail, createResponse } = require('../utils/app.utils')


const attachUserToClient = asyncHelper( async (req, _, next) => {
  editFields(req.body, req.user, [['supplier', 'id']])
  next()
}) 
const confirmClientInvoice = asyncHelper(async (req, _, next) => {
  const { invoice, clientName } = req.body
  if(!invoice || !clientName ) return next(createCustomError(400, 'All fields are required!'))
  const client = await Client.findOne({name: clientName, supplier: req.user.id})
  if(!client) return next(createCustomError(400, 'Client does not exist'))
  const invoiceExists = await Invoice.findOne({id: invoice, supplier: req.user.id, client: client.id})
  if(!invoiceExists) return next(createCustomError(400, 'This client does not have an invoice. Please generate one.'))
  req.invoiceId = invoiceExists.id
  next()
})

const populateInvoice = singArgAsync( async( id, next ) => {
  const invoice = await Invoice.findOne({id: id})
  .populate({path: 'supplier', select: '-__v -createdAt'})
  .populate({path: 'client', select: '-__v -createdAt, -supplier'})
  return invoice
})

const sendInvoiceMail = asyncHelper( async(req, res, next) => {
  const { invoiceId } = req
  const invoice = await populateInvoice(invoiceId, next)
  if(!Object.values(invoice.supplier.address)[0]) return next(createCustomError(400, 'Please provide your address before sending an invoice'))
  const mailOptions = {
    from: req.user.email,
    to: invoice.client.email,
    subject: `Invoice for ${invoice.service}`
  }
  const options = {invoice, title: `Invoice for ${invoice.service}`}
  await sendEmail(mailOptions, 'invoice.template', options, {})
  invoice.lastReminder = Date.now()
  await invoice.save({validateBeforeSave: false})
  return createResponse(res, 200, {
    status: 'success',
    message: 'Invoice sent successfully'
  })
})

module.exports = {
  attachUserToClient,
  confirmClientInvoice,
  populateInvoice,
  sendInvoiceMail,
}