import Product from '../models/products.js'

export const createProduct = async (req, res) => {
  const { name, image, description, quantity, price, brand, category } =
    req.body

  try {
    const productExists = await Product.findOne({ name })

    if (productExists) {
      res.status(500).json({ message: 'Product already exists' })
    }

    const product = await Product.create({
      name,
      image,
      description,
      quantity,
      price,
      brand,
      category,
    })

    res.json({
      id: product._id,
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category,
      rating: product.rating,
      dateCreatedOn: product.dateCreatedOn,
      reviews: product.reviews,
    })
  } catch (error) {
    res.status(500).json({ message: 'Cannot create Product', error: error })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(404).json({ message: 'Products not Found', error: error })
  }
}

export const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id)
    res.json(product)
  } catch (error) {
    res.status(404).json({ message: 'Product not Found', error: error })
  }
}

export const createNewReview = async (req, res) => {
  try {
    const review = {
      name: req.body.name,
      rating: req.body.rating,
      comment: req.body.comment,
    }
    const product = await Product.findById(req.params.id)
    await product.reviews.push(review)

    const totalRating = product.reviews.reduce(
      (total, x) => total + x.rating,
      0
    )
    if (product) {
      product.rating = totalRating / product.reviews.length
    }

    await product.save()

    res.json(product)
  } catch (error) {
    console.log(error.message)
    res
      .status(400)
      .json({ message: 'Oops...something went wrong', error: error.message })
  }
}

export const editProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      quantity,
      price,
      brand,
      category,
      rating,
    } = req.body

    const product = await Product.findById(req.params.id)

    const totalRating = product.reviews.reduce(
      (total, x) => total + x.rating,
      0
    )
    console.log(totalRating.rating)

    if (product) {
      product.name = name || product.name
      product.image = image || product.image
      product.description = description || product.description
      product.quantity = quantity || product.quantity
      product.price = price || product.price
      product.brand = brand || product.brand
      product.category = category || product.category
      product.rating =
        (totalRating + rating) / product.reviews.length || product.rating
    }

    await product.save()

    res.json(product)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Oops...something went wrong', error: error.message })
  }
}
