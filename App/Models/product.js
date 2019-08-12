const mongoose=require('mongoose')

const Schema=mongoose.Schema
const ProductSchema=new Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    imageURL:{
        type:String
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
})

const Product=mongoose.model('Product', ProductSchema)

module.exports={Product}