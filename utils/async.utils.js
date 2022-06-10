
const { createCustomError } = require('./app.utils')

module.exports.asyncHelper = (asyncFn) => {
  return async (req, res, next) => {
    try{
     return await asyncFn(req, res, next)
    }catch(err) {
      next(createCustomError(err.status, err.message))
    }
  }
}
module.exports.singArgAsync = (asyncFn) => {
  return async (arg, next) => {
    try {
     return await asyncFn(arg)
    } catch(err) {
      const error = new Error(err)
      const status = error.status || 500
      const message = error.message || 'Internal server error.'
        next(createCustomError(status, message))
    }
  }
}