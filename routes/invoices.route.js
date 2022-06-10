

const express = require('express');
const router = express.Router();

const { createInvoice } = require('../controllers/invoice.controller')
const { authorize } = require('../middleware/auth.middleware')
const { attachClientToBody } = require('../middleware/invoice.middleware')

router.route('/').post(authorize, attachClientToBody, createInvoice)

module.exports = router;
