const express = require('express');
const router = express.Router();

// Handle incoming GET requests to /products
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    })
})

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty,
        description: req.body.description,
        category: req.body.category,
        sale: req.body.sale
    }
    res.status(200).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    })
})

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'You passed and ID'
        })
    }
})

router.patch('/:productId', (req,res,next)=> {
    res.status(200).json({
        message: 'Updated product'
    })
})

router.put('/:productId', (req,res,next)=> {
    res.status(200).json({
        message: 'Updated product'
    })
})

router.delete('/:productId', (req,res,next)=> {
    res.status(200).json({
        message: 'Delete product'
    })
})

module.exports = router;