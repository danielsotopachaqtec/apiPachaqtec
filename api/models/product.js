const mongoose = require('mongoose')

const productSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    productImage: {type: String, require: true},
    price: {type: Number, require: true},
    qty: {type: Number, require: true},
    description: {type: String, require: true},
    category: {type: String, require: true},
    sale: {type: Boolean, require: true}
});

module.exports = mongoose.model('Product', productSchema);