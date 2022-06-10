
const express = require('express')
const router = express.Router()
const { authorize } = require('../middleware/auth.middleware')
const { attachUserToClient } = require('../middleware/client.middleware')
const { createClient } = require('../controllers/client.controller')

router.route('/').post(authorize, attachUserToClient, createClient)

module.exports = router