
const User = require('../models/user.model')
const { createDocument } = require('../utils/factory.utils')

module.exports.createUser = createDocument(User, ['password', '__v'])
