import express from 'express'
import {
  getAllProducts,
  createProduct,
  getSingleProduct,
  createNewReview,
  editProduct,
} from '../controllers/product.js'
const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.put('/:id/review', createNewReview)
router.post('/create', createProduct)
router.post('/:id/edit', editProduct)

export default router
