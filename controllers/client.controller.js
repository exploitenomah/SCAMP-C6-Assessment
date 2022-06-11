
const  Client  = require('../models/client.model')
const { asyncHelper } = require('../utils/async.utils')
const { createDocument } = require('../utils/factory.utils')


module.exports.createClient = createDocument(Client, [])

module.exports.sendClientInvoice = asyncHelper((req, res, next) => {
})