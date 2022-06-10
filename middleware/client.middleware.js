

const { asyncHelper } = require('../utils/async.utils')

module.exports.attachClientToBody = asyncHelper( async (req, res, next) => {
  req.body.user = req.user.id
  next()
}) 