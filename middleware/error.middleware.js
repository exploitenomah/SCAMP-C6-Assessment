


const { createResponse } = require('../utils/app.utils')
const ErrorHandler = (err, req, res, next) => {

  let message = err.message || 'An unknown error occured!'
  let status = err.status || 500
  createResponse(res, status, {message})
}

module.exports = ErrorHandler