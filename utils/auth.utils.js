

const bcrypt = require('bcryptjs')
const jwt = require('json-web-token')
const { createCustomError } = require('./app.utils')
const { singArgAsync } = require('./async.utils')


const  SECRET = process.env.JWT_SECRET

module.exports.createHash = singArgAsync(async (plain) => {
  console.log(plain)
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
    const hash = await bcrypt.hash(plain, salt)
    return  hash
})

module.exports.compareHash = async (plain, hash) => {
  return  await bcrypt.compare(plain, hash)
}

module.exports.generateToken = (payload, next) => {
  return jwt.encode(SECRET, payload, (err, token) => {
    console.log(SECRET, payload)
    if(err){
      next(createCustomError(500, err.message))
    }else{
      return token
    }
  })
}

module.exports.decodeToken = (payload, next) => {
  return jwt.decode(SECRET, payload, (err, decoded) => {
    if(err)return next(createCustomError(500, err.message))
    return decoded
  })
}