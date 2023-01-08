const { required } = require('joi/lib');
const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    image: {
        type: Object,
        required: true
    },
    details: {
        type: String,
    },
    sizes: {
        type: Array,
    }
})

const Product = model("Product", productSchema);

exports.Product = Product;