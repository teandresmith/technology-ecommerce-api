import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from './routes/products.js'
import shippingAddressRoutes from './routes/shippingAddress.js'
import userRoutes from './routes/user.js'
import orderRoutes from './routes/orders.js'

dotenv.config()

const app = express()

// Set up Database
connectDB()

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

// Set up Router
app.use('/api/products', productRoutes)
app.use('/api/user/shippingAddress', shippingAddressRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
