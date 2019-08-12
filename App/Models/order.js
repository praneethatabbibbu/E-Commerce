const mongoose=require('mongoose')
const Schema=mongoose.Schema
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    paymentmethod: {
        type: String
    },
    total: {
        type: String
    },
    code: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    orderlineitem: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        price: {
            type: Number
        },
        quantity: {
            type: String
        }
    }]
})

const OrderItem = mongoose.model('OrderItem', orderSchema)

module.exports={
    OrderItem
}