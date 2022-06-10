


const  Invoice  = require('../models/invoice.model')
const { createDocument } = require('../utils/factory.utils')


module.exports.createInvoice = createDocument(Invoice, [])