
const  Client  = require('../models/client.model')
const { createDocument } = require('../utils/factory.utils')


module.exports.createClient = createDocument(Client, [])
