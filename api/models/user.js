const mongoose = require('mongoose');
const Utils = require('../../utils/resource')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, match: Utils.validator.formatEmail },
    password: { type: String, required: true},
    phoneNumber: { type: String, required: true, unique: true},
    role : { type: String, default: 'user',enum: ['user', 'admin', 'superadmin']}
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('User', userSchema);