
const { asyncHelper } = require('./async.utils')
const { createResponse } = require('./app.utils')

module.exports.createDocument = (Model, excludedFields) => {
  return asyncHelper( async (req, res, next) => {
    const doc = new Model(req.body)
    const saved = await doc.save()
    if(!saved) return next(createCustomError(500, 'Unable process request. Please try again later.'))
    excludedFields.forEach(field => {
      saved[field] = undefined
    })
    return createResponse(res, 200, saved)
  })
}
