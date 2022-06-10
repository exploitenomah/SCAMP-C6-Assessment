
const User = require('../models/user.model')
const { asyncHelper } = require('../utils/async.utils')
const { compareHash, generateToken, decodeToken } = require('../utils/auth.utils')
const { createCustomError } = require('../utils/app.utils')
const { createResponse } = require('../utils/response.utils')

module.exports.authenticate = asyncHelper( async (req, res, next) => {
  const { email, password } = req.body
  if(!email || !password) 
    return next(createCustomError(400, 'Please provide email and password'))
  const exists = await User.findOne({email}).select('+password')
  if(!exists) 
    return next(createCustomError(400, 'Invalid email or password'))
  if(!(compareHash(password, exists.password))) 
    return next(createCustomError())
  const token = generateToken(exists.id)
  exists.password = undefined
  const user = exists
  return createResponse(res, 200, {token, user})
})

module.exports.authorize = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if(!token) return next(createCustomError(401, 'Unauthorized!!!'))
  const authorized = decodeToken(token, next)
  if(!authorized) return next(createCustomError(401, 'Unauthorized!!!'))
  req.user = await User.findOne({id: authorized})
  next()
}