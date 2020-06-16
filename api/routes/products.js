const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')
const checkRole = require('../middleware/check-role')
const ProductController = require('../controllers/products')
const uploadImages = require('../../functions/uploadImage')

// Handle incoming GET requests to /products
router.get('/', ProductController.getAllProduct);

router.post('/', uploadImages.upload.fields([{
    name: 'productImage'
}, {
    name: 'imagesProducts',
    maxCount: 8,
}]), checkAuth, checkRole(process.env.ROLE_ADMIN), ProductController.createProduct)

router.get('/:productId', ProductController.getProductById)

router.patch('/:productId', checkAuth,  checkRole(process.env.ROLE_ADMIN), ProductController.fixProduct)

router.put('/:productId', checkAuth,  checkRole(process.env.ROLE_ADMIN), ProductController.editProduct)

router.delete('/:productId', checkAuth,  checkRole(process.env.ROLE_ADMIN), ProductController.deleteProduct)

module.exports = router;