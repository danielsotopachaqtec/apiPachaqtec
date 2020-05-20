const express = require('express');
const router = express.Router();


// Handle incoming GET requests to /orders
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request to /orders'
    })
})

router.get('/:orderId', (req,res,next) => {
    const id = req.params.orderId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered the special order ID',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'You passed and order ID'
        })
    }
})

router.patch('/:orderId', (req,res,next)=> {
    res.status(200).json({
        message: 'Updated order'
    })
})

router.put('/:orderId', (req,res,next)=> {
    res.status(200).json({
        message: 'Updated order'
    })
})

router.delete('/:orderId', (req,res,next)=> {
    res.status(200).json({
        message: 'Delete order'
    })
})

module.exports = router;