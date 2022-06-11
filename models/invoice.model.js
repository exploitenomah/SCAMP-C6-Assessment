




const  mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'Please provide the description of the service'],
    trim: true
  },
  quantity:{
    type: Number,
    required: [true, 'Please provide the quantity of items']
  },
  unitPrice: {
    type: Number,
    required: [true, 'Please provide the unit price']
  }
}, {
  toJSON:{
    virtuals: true
  },
  toObject:{
    virtuals: true
  }
})

productSchema.virtual('total').get(function(){
  return this.unitPrice * this.quantity
})

const invoiceSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide the user\'s  details'],
    ref: 'User',
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Please provide client\'s details'],
  },
  service:{
    type: String,
    required: [true, 'Please provide the name of the service'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Please provide a summmary'],
    trim: true
  },
  products: [productSchema],
  suppliedAt:{
    type: Date,
    required: [true, 'Please specify the supply date']
  },
  paymentDueAt: {
    type: Date,
    required: [true, 'Please specify the due date for payment']
  },
  createdAt: {
    type: Date, 
    default: Date.now
  }
}, {
  toJSON: {
    virtuals: true
  }
  ,
  toObject:{
    virtuals: true
  }
})
invoiceSchema.virtual('total').get(function(){
  return this.products.reduce((prev, current) => (
    prev.total + current.total
  ))
})

const Invoice = new mongoose.model('Invoice', invoiceSchema)


module.exports = Invoice