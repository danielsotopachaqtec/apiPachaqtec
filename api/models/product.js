const mongoose = require('mongoose')

const productSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    qty: Number,
    description: String,
    category: String,
    sale: Boolean
});

module.exports = mongoose.model('Product', productSchema);