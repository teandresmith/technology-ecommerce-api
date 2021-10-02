import mongoose from 'mongoose'

const shippingAddressSchema = mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema)

export default ShippingAddress
