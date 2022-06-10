

class CustomError extends Error{
  constructor(statusCode, message){
    super(message)
    this.status = statusCode || 500
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports.CustomError = CustomError