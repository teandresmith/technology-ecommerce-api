import express from 'express'
import {
  getUserProfile,
  registerUser,
  updateUserDefaultShippingAddress,
  authUser,
  updateUserDetails,
} from '../controllers/user.js'
import { protect } from '../middleware/authentication.js'

const router = express.Router()

router.post('/login', authUser)
router.post('/register', registerUser)
router.get('/profile', protect, getUserProfile)
router.put(
  '/profile/defaultShipping',
  protect,
  updateUserDefaultShippingAddress
)
router.put('/profile/accountDetails', protect, updateUserDetails)

export default router
