


const { createResponse } = require('../utils/response.utils')
const ErrorHandler = (err, req, res, next) => {

  let message = err.message
  let status = err.status || 500
  if(err.message.startsWith("E11000")) {
   status = 400
   message = message
  }
  createResponse(res, status, {message})
}

module.exports = ErrorHandler