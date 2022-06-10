

const { asyncHelper } = require('../utils/async.utils')
const { editFields } = require('../utils/app.utils')


module.exports.attachUserToClient = asyncHelper( async (req, res, next) => {
  editFields(req.body, req.user, [['supplier', 'id']])
  next()
}) 