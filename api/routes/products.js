const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')
const ProductController = require('../controllers/products')
const uploadImages = require('../../functions/uploadImage')

// Handle incoming GET requests to /products
router.get('/', ProductController.getAllProduct);

router.post('/', uploadImages.upload.single('productImage'), checkAuth, ProductController.createProduct)

router.get('/:productId', ProductController.getProductById)

router.patch('/:productId', checkAuth, ProductController.fixProduct)

router.put('/:productId', checkAuth, ProductController.editProduct)

router.delete('/:productId', checkAuth, ProductController.deleteProduct)

module.exports = router;