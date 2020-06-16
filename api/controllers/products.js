const Product = require('../models/product')
const mongoose = require('mongoose')
const convertArrayToObject = require('../../functions/utils')

exports.getAllProduct = (req,res,next) => {
    Product.find()
    .exec()
    .then(docs => {
        if(docs.length >= 0){
            res.status(200).json({
                count: docs.length,
                message: "Handling GET request to /order",
                data: docs.map(doc => {
                    console.log('doc.productImage', doc.productImage)
                    return{
                        _id: doc.id,
                        name: doc.name,
                        productImage: doc.productImage,
                        price: doc.price,
                        qty: doc.qty,
                        description: doc.description,
                        category: doc.category,
                        sale: doc.sale,
                        _id: new mongoose.Types.ObjectId(),
                        imagesProducts: doc.imagesProducts,
                        colors: doc.colors,
                        color:  doc.color,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc.id 
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

exports.createProduct = (req, res, next) => {
    console.log('req', req)
    const endpoint = `${req.protocol}://${req.headers.host}/`
    const imagesProducts = req.files.imagesProducts.map((file,index, arr)=> {
            return { url: `${endpoint}${file.path}` } 
})
    console.log('imagesProducts', imagesProducts)
    console.log('req.body.colors', req.body.colors)
        
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        productImage: `${endpoint}${req.files.productImage[0].path}`,
        imageBrand: req.body.imageBrand,
        imagesProducts: imagesProducts,
        colors: req.body.colors,
        color:  req.body.color,
        price: req.body.price,
        qty: req.body.qty,
        description: req.body.description,
        category: req.body.category,
        sale: req.body.sale,
    })
    product.save()
    .then(result => {
        
        console.log(result);
        res.status(201).json({
            message: 'Handling POST request to /products',
            data: result,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + result._id 
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

exports.getProductById = (req,res,next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=> {
        console.log(doc)
        if(doc){
            res.status(200).json({
                message: 'Handling GET request to /:productId',
                data: doc
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

exports.fixProduct = (req,res,next)=> {
    const id = req.params.productId;
    let updateOps = {};
    console.log('req.body', req.body)
    Product.update({_id: id}, {$set: {
        price: req.body.price,
        sale: req.body.sale
    }})
    .exec()
    .then(result => {
        console.log('result', result)
        res.status(200).json({
            message: 'Handling PATCH request to /productId',
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

exports.editProduct = (req,res,next)=> {
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
        res.status(200).json({
            message: 'Handling PUT request to /productId',
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

exports.deleteProduct = (req,res,next)=> {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result=> {
        console.log('result', result)
        res.status(200).json({
            message: 'Handling Delete request to /productId',
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