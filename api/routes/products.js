const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const Product = require('../models/product');
// Handle incoming GET requests to /products
router.get('/', (req,res,next) => {
    Product.find()
    .exec()
    .then(docs => {
        if(docs.length >= 0){
            res.status(200).json({
                count: docs.length,
                message: "Handling GET request to /order",
                data: docs.map(doc => {
                    return{
                        _id: doc.id,
                        name: doc.name,
                        productImage: doc.productImage,
                        price: doc.price,
                        qty: doc.qty,
                        description: doc.description,
                        category: doc.category,
                        sale: doc.sale,
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
});

router.post('/', upload.single('productImage'),(req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        productImage: req.file.path,
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
})

router.get('/:productId', (req,res,next) => {
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
})

router.patch('/:productId', (req,res,next)=> {
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
})

router.delete('/:productId', (req,res,next)=> {
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
})

module.exports = router;