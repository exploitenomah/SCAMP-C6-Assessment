

const  mongoose = require('mongoose');
const { createHash } = require('../utils/auth.utils')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.']
  },
  email: {
    type: String,
    unique: [true, 'An user already exists with that email.'],
    required: [true, 'Please provide an email']
  },
  password: {
    type: String,
    required: [true, 'Please provide your password.'],
    select: false,
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
  address: String,
  emailConfirmToken: String,
  passwordResetToken: String,
})
userSchema.pre('save', async function(next){
  if(!(this.isModified('password'))) next()
  const password = await createHash(this.password, next)
  this.password = password
  next()
})
const User = new mongoose.model('User', userSchema)


module.exports = User