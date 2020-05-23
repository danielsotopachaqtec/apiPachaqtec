const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


const Product = require('../models/product');
// Handle incoming GET requests to /products
router.get('/', (req,res,next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log('doc', docs)
        if(docs.length >= 0){
        res.status(200).json(docs)
        } else {
            res.status(404).json({
                message: 'No entries found'
            })
        }
    })
    .catch(err=> {
        console.log('err', err);
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty,
        description: req.body.description,
        category: req.body.category,
        sale: req.body.sale
    })
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST request to /products',
            createdProduct: result
        })
    })
    .catch(err=> console.log(err))
})

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=> {
        console.log(doc)
        if(doc){
            res.status(200).json(doc)
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            })
        }
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:productId', (req,res,next)=> {
    const id = req.params.productId;
    let updateOps = {};
    console.log('req.body', req.body)
    // for (let ops of req.body){
    //     console.log('ops.propName', ops.propName, ops.value)
    //     updateOps[ops.propName] = ops.value
    // }
    Product.update({_id: id}, {$set: {
        price: req.body.price,
        sale: req.body.sale
    }})
    .exec()
    .then(result => {
        console.log('result', result)
        res.status(200).json(result)
    })
    .catch(err=> {
        console.log('err', err)
        res.status(500).json({
            error: err
        })
    })
})

router.put('/:productId', (req,res,next)=> {
    const id = req.params.productId;
    let updateOps = {};
    console.log('req.body', req.body)
    Product.update({_id: id}, {$set: {
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty,
        description: req.body.description,
        category: req.body.category,
        sale: req.body.sale
    }})
    .exec()
    .then(result => {
        console.log('result', result)
        res.status(200).json(result)
    })
    .catch(err=> {
        console.log('err', err)
        res.status(500).json({
            error: err
        })
    })
})

router.delete('/:productId', (req,res,next)=> {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result=> {
        console.log('result', result)
        res.status(200).json(result)
    })
    .catch(err=> {
        console.log('err', err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;