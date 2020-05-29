const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/signup', (req,res, next) => {
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
                    phoneNumber: req.body.phoneNumber
                });
                user
                .save()
                .then((result) => {
                    console.log('result signup', result)
                    res.status(201).json({
                        message: "Handling POST request to /users",
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
        });
    });
});

module.exports = router;