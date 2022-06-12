
const express = require('express')
const router = express.Router()
const { authorize } = require('../middleware/auth.middleware')
const { 
  attachUserToClient,  
  confirmClientInvoice, 
  sendInvoiceMail
 } = require('../middleware/client.middleware')
const { createClient } = require('../controllers/client.controller')

router.route('/').post(authorize, attachUserToClient, createClient)
router.route('/invoice').post(authorize, confirmClientInvoice, sendInvoiceMail)


module.exports = router
