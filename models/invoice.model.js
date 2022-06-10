




const  mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'Please provide the user\'s  details']
  },
  client: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'Please provide client\'s details']
  },
  service:{
    type: String,
    required: [true, 'Please provide the name of the service']
  },
  summary: {
    type: String,
    required: [true, 'Please provide a summmary']
  },
  products: [{
    description:{
      type: String,
      required: [true, 'Please provide the description of the service'],
    },
    quantity:{
      type: Number,
      required: [true, 'Please provide the quantity of items']
    },
    unitPrice: {
      type: Number,
      required: [true, 'Please provide the unit price']
    }
  }],
  createdAt: {
    type: Date, 
    default: Date.now
  }
})
const Invoice = new mongoose.model('Invoice', invoiceSchema)


module.exports = Invoice