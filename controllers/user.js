import User from '../models/user.js'
import Order from '../models/orders.js'
import ShippingAddress from '../models/shippingAddress.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body

    const user = await User.findOne({ email })

    if (user) {
      res.status(400).json({ message: 'That email already exists' })
    } else {
      const newUser = await User.create({ name, email, password, isAdmin })

      res.json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Oops...something went wrong', error: error.message })
  }
}

export const updateUserDefaultShippingAddress = async (req, res) => {
  try {
    const { street, city, state, country, postalCode } = req.body
    const user = await User.findById(req.user._id)
    const defaultShipping = await ShippingAddress.findById(
      user.defaultShippingAddress
    )

    if (defaultShipping) {
      defaultShipping.street = street || defaultShipping.street
      defaultShipping.city = city || defaultShipping.city
      defaultShipping.state = state || defaultShipping.state
      defaultShipping.country = country || defaultShipping.country
      defaultShipping.postalCode = postalCode || defaultShipping.postalCode

      const updatedDefaultShipping = await defaultShipping.save()

      res.json({
        _id: updatedDefaultShipping._id,
        street: updatedDefaultShipping.street,
        city: updatedDefaultShipping.city,
        state: updatedDefaultShipping.state,
        country: updatedDefaultShipping.country,
        postalCode: updatedDefaultShipping.postalCode,
      })
    } else {
      const newShippingAddress = await ShippingAddress.create({
        street: street,
        city: city,
        state: state,
        country: country,
        postalCode: postalCode,
        user: user._id,
      })
      user.defaultShippingAddress = newShippingAddress._id
      await user.save()
      res.json({
        _id: newShippingAddress._id,
        street: newShippingAddress.street,
        city: newShippingAddress.city,
        state: newShippingAddress.state,
        country: newShippingAddress.country,
        postalCode: newShippingAddress.postalCode,
      })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Oops...something went wrong', error: error })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const orders = await Order.find({ user: req.user._id })
    const defaultShippingAddress = await ShippingAddress.findById(
      user.defaultShippingAddress
    )
    const shippingAddresses = await ShippingAddress.find({ user: req.user_id })
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      defaultShippingAddress: defaultShippingAddress,
      shippingAddresses: shippingAddresses,
      orders: orders,
    })
  } catch (error) {
    res.status(404).json({ message: 'User does not exist', error: error })
  }
}

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid Email or Password' })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Invalid Email or Password', error: error.message })
  }
}

export const updateUserDetails = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = name || user.name
      user.email = email || user.email
      if (password) {
        user.password = password
      }
      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Oops...something went wrong', error: error.message })
  }
}
