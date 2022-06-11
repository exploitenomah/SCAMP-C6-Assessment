
const express = require('express')
const router = express.Router()
const { authorize } = require('../middleware/auth.middleware')
const { 
  attachUserToClient,  
  confirmClientInvoice, 
  populateInvoice,
  sendInvoiceMail
 } = require('../middleware/client.middleware')
const { createClient } = require('../controllers/client.controller')

router.route('/').post(authorize, attachUserToClient, createClient)
router.route('/invoice').post(authorize, confirmClientInvoice, populateInvoice, sendInvoiceMail)


module.exports = router

/*
      //- p=`Issued at: ${new Date(createdAt).toISOLocaleString()}`
      +contact(invoice.client.billingAddress)
      +contact(invoice.supplier.address)


*/