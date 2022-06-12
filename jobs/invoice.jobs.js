
const { noArgAsync } = require('../utils/async.utils')
const Invoice = require('../models/invoice.model')
const { emailInvoice } = require('../utils/app.utils')

const autoSendInvoicesJob = noArgAsync( async () => {
  const milliSec = 86400000
  const currentDate = Date.now() 
  const overDueDate = new Date(currentDate).toISOString().split('T')[0]
  const lastReminder = new Date((currentDate - (milliSec * 7))).toISOString().split('T')[0] 
  const invoices = await Invoice.find(
    {
      paymentDueAt: {$lt: overDueDate },  
      lastReminder: {$lt: lastReminder }
    })
    .populate({path: 'supplier', select: '-__v -createdAt'})
    .populate({path: 'client', select: '-__v -createdAt, -supplier'})
    if(invoices.length > 0) {
      invoices.forEach( async invoice => await emailInvoice(invoice, 'overdue.template'))
    }
})
module.exports = {
  autoSendInvoicesJob
}

