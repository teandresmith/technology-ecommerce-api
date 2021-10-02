import mongoose from 'mongoose'
import ShippingAddress from '../models/shippingAddress.js'

export const createShippingAddress = async (req, res) => {
  const { street, city, state, country, postalCode } = req.body

  try {
    const shippingAddress = await ShippingAddress.findOne({ street })
    if (
      shippingAddress &&
      shippingAddress.street === street &&
      shippingAddress.city === city &&
      shippingAddress.state === state &&
      shippingAddress.country === country &&
      shippingAddress.postalCode === postalCode
    ) {
      res.status(400).json({ message: 'That Shipping Address already exists' })
    } else {
      const newAddress = await ShippingAddress.create({
        street,
        city,
        state,
        country,
        postalCode,
      })

      if (newAddress) {
        res.json(newAddress)
      }
    }
  } catch (error) {
    res.status(404).json({ message: 'Oops, something went wrong...' })
  }
}

export const deleteShippingAddress = async (req, res) => {
  try {
    await ShippingAddress.findByIdAndDelete(req.params.id)
    res.json({ message: 'Shipping address was deleted' })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Oops...something went wrong', error: error.message })
  }
}

export const getUserShippingAddresses = async (req, res) => {
  try {
    const shippingAddress = await ShippingAddress.findById(req.user.id)
    res.json(shippingAddress)
  } catch (error) {
    res.status(404).json({ message: 'Oops, something went wrong...' })
  }
}
