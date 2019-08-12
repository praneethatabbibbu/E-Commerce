const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartLineItem = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number
    }
})

const CartItem = mongoose.model('CartItem', CartLineItem)

module.exports = { CartItem }