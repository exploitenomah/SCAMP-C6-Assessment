
const Client = require('../models/client.model')
const { asyncHelper } = require('../utils/async.utils')
const { createCustomError, editFields } = require('../utils/app.utils')


module.exports.attachClientToBody = asyncHelper( async (req, _, next) => {
  const { client: clientName } = req.body
  if(!clientName) return next(createCustomError(400, 'Please provide the client\'s name'))
  const client = await Client.findOne({name: clientName, supplier: req.user.id})
  if(!client) return next(createCustomError(400, 'Cannot create invoice for non-existent client.'))
  editFields(req.body, client, [['client', 'id']])
  editFields(req.body, req.user, [['supplier', 'id']]) 
  next()
}) 