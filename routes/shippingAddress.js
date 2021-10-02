import express from 'express'
import {
  createShippingAddress,
  deleteShippingAddress,
} from '../controllers/shippingAddress.js'
import { protect } from '../middleware/authentication.js'

const router = express.Router()

router.delete('/delete/:id', protect, deleteShippingAddress)
router.post('/create', protect, createShippingAddress)

export default router
