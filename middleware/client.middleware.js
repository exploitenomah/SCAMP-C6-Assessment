
const Client = require('../models/client.model')
const Invoice = require('../models/invoice.model')
const { asyncHelper, singArgAsync } = require('../utils/async.utils')
const { editFields,  createCustomError, sendEmail, createResponse, emailInvoice } = require('../utils/app.utils')


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
  const message = await emailInvoice(invoice, 'invoice.template')
  createResponse(res, 200, {
    status: 'success',
    message
  }) 
})

module.exports = {
  attachUserToClient,
  confirmClientInvoice,
  populateInvoice,
  sendInvoiceMail,
}