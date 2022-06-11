
const Client = require('../models/client.model')
const Invoice = require('../models/invoice.model')
const { asyncHelper } = require('../utils/async.utils')
const { editFields,  createCustomError, sendEmail, createResponse } = require('../utils/app.utils')


module.exports.attachUserToClient = asyncHelper( async (req, _, next) => {
  editFields(req.body, req.user, [['supplier', 'id']])
  next()
}) 

module.exports.confirmClientInvoice = asyncHelper(async (req, _, next) => {
  const { invoice, clientName } = req.body
  if(!invoice || !clientName ) return next(createCustomError(400, 'All fields are required!'))
  const client = await Client.findOne({name: clientName, supplier: req.user.id})
  if(!client) return next(createCustomError(400, 'Cannot send invoice to unexistent client'))
  const invoiceExists = await Invoice.findOne({id: invoice, supplier: req.user.id, client: client.id})
  if(!invoiceExists) return next(createCustomError(400, 'Please generate an invoice for this client and try again'))
  req.invoiceId = invoiceExists.id
  next()
})

module.exports.populateInvoice = asyncHelper( async( req, _, next ) => {
  const { invoiceId } = req
  const invoice = await Invoice.findOne({id: invoiceId})
  .populate({path: 'supplier', select: '-__v -createdAt'})
  .populate({path: 'client', select: '-__v -createdAt, -supplier'})
  req.invoice = invoice
  next()
})

module.exports.sendInvoiceMail = asyncHelper( async(req, res, next) => {
  const { invoice } = req
  if(!Object.values(invoice.supplier.address)[0]) return next(createCustomError(400, 'Please provide your address before sending an invoice'))
  const mailOptions = {
    from: req.user.email,
    to: invoice.client.email,
    subject: `Invoice for ${invoice.service}`
  }
  const options = {invoice, title: `Invoice for ${invoice.service}`}
  await sendEmail(mailOptions, 'invoice.template', options, {})
  return createResponse(res, 200, {
    status: 'success',
    message: 'Invoice sent successfully'
  })
})