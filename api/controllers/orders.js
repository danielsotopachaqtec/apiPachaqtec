const Order = require('../models/orders')
const Product = require('../models/product')
const mongoose = require('mongoose')

exports.getAllOrder = (req,res,next) => {
    Order.find()
    .populate('product')
    .populate('userId')
    .exec()
    .then(docs => {
        console.log('docs', docs)
        if(docs.length >= 0){
        res.status(200).json({
            count: docs.length,
            message: "Handling GET request to /order",
            data: docs.map(doc => {
                return{
                    _id: doc._id,
                    details: doc.details,
                    product: doc.product,
                    quantity: doc.quantity,
                    details: doc.details,
                    location: doc.location,
                    totalPrice: doc.totalPrice,
                    userId: doc.userId,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc.id 
                    }
                }
            })
        })
        } else {
            res.status(404).json({
                errors: true,
                message: 'No entries found'
            })
        }
    })
    .catch(err=> {
        console.log('err', err);
        res.status(500).json({
            errors: true,
            message: err
        })
    })
}

exports.createOrder = (req, res, next) => {
    const order =  new Order ({
        _id: mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity,
        details: req.body.details,
        location: req.body.location,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
        userId: req.body.userId
    })
    
    order
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST request to /order',
                _id: mongoose.Types.ObjectId(),
                product: result.product,
                quantity: result.quantity,
                details: result.details,
                location: result.location,
                totalPrice: result.totalPrice,
                user: result.user,
                userId: result.userId,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id 
                }
            })
        }).catch(err=> {
            console.log('err', err);
            res.status(500).json({
                errors: true,
                message: err
            })
        });
}

exports.getOrderById = (req,res,next) => {
    const id = req.params.orderId;
    Order.findById(id)
    .populate('product')
    .populate('userId')
    .exec()
    .then(doc=> {
        console.log(doc)
        if(doc){
            res.status(200).json({
                message: 'Handling GET request to /:orderId',
                _id: doc._id,
                details: doc.details,
                product: doc.product,
                quantity: doc.quantity,
                details: doc.details,
                location: doc.location,
                totalPrice: doc.totalPrice,
                userId: doc.userId,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' 
                }
            })
        } else {
            res.status(404).json({
                errors: true,
                message: 'No valid entry found for provided ID'
            })
        }
    }).catch(err=> {
        console.log('err', err);
        res.status(500).json({
            errors: true,
            message: err
        })
    })
}

exports.fixOrder = (req,res,next)=> {
    const id = req.params.orderId;
    Order.update({_id: id}, {$set: {
        product: req.body.productId,
        quantity: req.body.quantity,
        details: req.body.details,
        totalPrice: req.body.totalPrice
    }})
    .exec()
    .then(result => {
        console.log('result', result)
        res.status(200).json({
            message: 'Handling PATCH request to /orderId',
            data: result
        })
    })
    .catch(err=> {
        console.log('err', err);
        res.status(500).json({
            errors: true,
            message: err
        })
    })
}

exports.editOrder = (req,res,next)=> {
    const id = req.params.orderId;
    console.log('req.body', req.body)
    Order.update({_id: id}, {$set: {
        product: req.body.productId,
        quantity: req.body.quantity,
        details: req.body.details,
        location: req.body.location,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
        userId: req.body.userId
    }})
    .exec()
    .then(result => {
        console.log('result', result)
        res.status(200).json({
            message: 'Handling PUT request to /orderId',
            data: result
        })
    })
    .catch(err=> {
        console.log('err', err);
        res.status(500).json({
            errors: true,
            message: err
        })
    })
}

exports.deleteOrder = (req,res,next)=> {
    const id = req.params.orderId;
    Order.remove({_id: id})
    .exec()
    .then(result=> {
        console.log('result', result)
        res.status(200).json({
            message: 'Handling Delete request to /orderId',
            data: result,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' 
            }
        })
    })
    .catch(err=> {
        console.log('err', err);
        res.status(500).json({
            errors: true,
            message: err
        })
    })
}