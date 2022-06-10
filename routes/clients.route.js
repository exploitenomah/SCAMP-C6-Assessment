
const express = require('express')
const router = express.Router()
const { authorize } = require('../middleware/auth.middleware')
const { attachClientToBody } = require('../middleware/client.middleware')
const { createClient } = require('../controllers/client.controller')

router.route('/').post(authorize, attachClientToBody, createClient)

module.exports = router