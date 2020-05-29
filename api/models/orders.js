const mongoose = require('mongoose')

const OrderSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    details: String,
    location: String,
    totalPrice: Number,
    user: String,
    userId: String
});

module.exports = mongoose.model('Order', OrderSchema);