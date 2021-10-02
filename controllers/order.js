import Order from '../models/orders.js'

export const newOrder = async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    name,
    email,
    paymentMethod,
    paymentResult,
    shippingPrice,
    totalPrice,
  } = req.body
  try {
    const order = await Order.create({
      user,
      orderItems,
      shippingAddress,
      name,
      email,
      paymentMethod,
      paymentResult,
      shippingPrice,
      totalPrice,
    })

    res.json({
      user: order.user,
      orderItems: order.orderItems,
      shippingAddress: order.shippingAddress,
      name: order.name,
      email: order.email,
      id: order._id,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong...',
      error: error.message,
    })
  }
}
