const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/user.controller')
const { authenticate } = require('../middleware/auth.middleware')


router.route('/').post(createUser)
router.route('/login').post(authenticate)

module.exports = router;
