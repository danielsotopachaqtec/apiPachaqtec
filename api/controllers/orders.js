const Order = require('../models/orders')
const mongoose = require('mongoose')

exports.getAllOrder = (req,res,next) => {
    Order.find()
    .select('_id product quantity')
    .populate('product')
    .exec()
    .then(docs => {
        console.log('doc', docs)
        if(docs.length >= 0){
        res.status(200).json({
            count: docs.length,
            message: "Handling GET request to /order",
            data: docs.map(doc => {
                return{
                    _id: doc.id,
                    product: doc.product,
                    quantity: doc.quantity,
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
        product: req.body.productId,
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
                data: result,
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
    .exec()
    .then(doc=> {
        console.log(doc)
        if(doc){
            res.status(200).json({
                message: 'Handling GET request to /:orderId',
                data: doc,
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