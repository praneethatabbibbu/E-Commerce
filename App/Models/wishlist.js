const mongoose=require('mongoose')
const Schema=mongoose.Schema

const WishlistSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    }
})

const WishList=mongoose.model('WishList',WishlistSchema)
module.exports={
    WishList
}