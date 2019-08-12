const mongoose=require('mongoose')

const Schema=mongoose.Schema

const AddressSchema=new Schema({
    street:{
        type:String
    },
    city:{
        type:String
    },
    pin:{
        type:String
    },
    ladmark:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

})

const Address=mongoose.model('Address', AddressSchema)
module.exports={Address}