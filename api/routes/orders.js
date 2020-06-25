const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const OrdersController = require('../controllers/orders')
// import OrdersController from '../controllers/orders'
// Handle incoming GET requests to /orders

router.get('/', checkAuth,OrdersController.getAllOrder), 
router.post('/', checkAuth, OrdersController.createOrder)

router.get('/:orderId', checkAuth, OrdersController.getOrderById)
router.get('/user/:userId', checkAuth, OrdersController.getOrderByUserId)

router.patch('/:orderId', checkAuth, OrdersController.fixOrder)

router.put('/:orderId', checkAuth, OrdersController.editOrder)

router.delete('/:orderId', checkAuth, OrdersController.deleteOrder)

module.exports = router;