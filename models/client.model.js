

const  mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the client\'s name.'],
    unique: [true, 'A client already exists with that name']
  },
  email: {
    type: String,
    unique: [true, 'An client already exists with that email.'],
    required: [true, 'Please provide the client\'s  email']
  },
  address: {
    type: String,
    required: [true, 'Please provide client\'s address']
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'Please provide the user this client belongs to!']
  },
  createdAt: {
    type: Date, 
    default: Date.now
  }
})
const Client = new mongoose.model('Client', clientSchema)


module.exports = Client