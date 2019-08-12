const mongoose=require('mongoose')
const Schema=mongoose.Schema

const OrderstastusSchema=new Schema({
    order:{
        type:Schema.Types.ObjectId,
        ref:'OrderItem'
    },
    name:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const OrderStatus=mongoose.model('OrderStatus', OrderstastusSchema)

module.exports={OrderStatus}