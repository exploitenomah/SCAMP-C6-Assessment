

const  mongoose = require('mongoose');
const { createCustomError } = require('../utils/app.utils')

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the client\'s name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide the client\'s  email']
  },
  billingAddress: {
    street: {
      type: String,
      required: [true, 'Please provide client\'s address']
    },
    city: {
      type: String,
      required: [true, 'Please provide client\'s address']
    },
    addressLine: {
      type: String,
      required: [true, 'Please provide client\'s address']
    }
  },
  supplier: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'Please provide the user this client belongs to!']
  },
  createdAt: {
    type: Date, 
    default: Date.now
  }
})

clientSchema.pre('save', async function(next) {
  const exists = await this.constructor.find({name: this.name, email: this.email, supplier: this.supplier})
  if(exists.length > 0) next(createCustomError(400, 'Client already exists'))
  next()
})
const Client = new mongoose.model('Client', clientSchema)


module.exports = Client