const mongoose = require('mongoose')

const colorSchema = mongoose.Schema({
    color:  {type: String, require: true},
    stock: {type: Number, require: true},
})

const imagesProducts = mongoose.Schema({
    url: { type: String, require: true}
})

const productSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    productImage: {type: String, require: true},
    imageBrand: {type: String, require: true},
    colors:[colorSchema],
    imagesProducts: [{}],
    color:  {type: String, require: true},
    price: {type: String, require: true},
    qty: {type: Number, require: true},
    description: {type: String, require: true},
    category: {type: String, require: true},
    sale: {type: Boolean, require: true}
});

module.exports = mongoose.model('Product', productSchema);