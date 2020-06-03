const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/signin', (req,res,next) => {
    User.find({  phoneNumber: req.body.phoneNumber})
    .exec()
    .then((user) => {
        if(user.length < 1){
            return res.status(401).json({
                errors: true,
                message: 'Phone number not found!, user doesn\t exist'
            })
        } else if(user[0].role !== req.body.role){
            return res.status(403).json({
                errors: true,
                message: 'Please make sure you are logging in from the right portal.'
            })
        }else {
            bcrypt.compare(req.body.password, user[0].password, (err,result) => {
                if(err){
                    return res.status(401).json({
                        errors: true,
                        message: 'Auth failed!'
                    })
                }
                if(result){
                    const token = jwt.sign(
                        {
                            phoneNumber: user[0].phoneNumber,
                            userId: user[0]._id,
                            role: user[0].role,
                            email: user[0].email
                        }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    })
                }
                return res.status(401).json({
                    errors: true,
                    message: 'Auth failed!'
                })
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
})

router.post('/signup', (req,res, next) => {
    User.find({  phoneNumber: req.body.phoneNumber})
    .exec()
    .then((user) => {
        if(user.length >= 1){
            return res.status(409).json({
                errors: true,
                message: 'PhoneNumber exists'
            })
        } else {
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(req.body.password, salt, (err, hash)=> {
                    // Store hash in your password DB.
                    if(err){
                        console.log('err',err)
                        return res.status(500).json({
                            errors: true,
                            message: err
                        })
                    } else {
                        console.log('password', hash)
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            phoneNumber: req.body.phoneNumber,
                            role: req.body.role
                        });
                        user
                        .save()
                        .then((result) => {
                            console.log('result signup', result)
                            res.status(201).json({
                                message: "Handling POST request to /users",
                                data: result,
                                request: {
                                    type: 'DELETE',
                                    url: 'http://localhost:3000/users/' + result.id 
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
                });
            });
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

router.delete('/:userId', (req,res,next)=> {
    const id = req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result=> {
        console.log('result', result)
        res.status(200).json({
            message: 'Handling Delete request to /userId',
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