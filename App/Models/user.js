const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const Schema=mongoose.Schema

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(value){
                return 'invalid email format'
            }
        }
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:60
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }]
})

UserSchema.pre('save', function(next){
    const user=this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt){
            bcryptjs.hash(user.password,salt)
            .then(function(encryptedPassword){
                user.password=encryptedPassword
                next()
            })
        })
    }else{
        next()
    }
})

UserSchema.statics.findByCredentials=function(email,password){
    const User=this
return User.findOne({email})
.then(user=>{
    if(!user){
        return Promise.reject('invalid email/password')
    }
    return bcryptjs.compare(password,user.password)
    .then(result=>{
        if(result){
            return Promise.resolve(user)
        }else{
            return Promise.reject('invalid email/password')
        }
    })
})
.catch(err=>{
    return Promise.reject(err)
})
}

UserSchema.methods.generateToken=function(){
    const user=this
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(new Date())
    }
    const token=jwt.sign(tokenData,'jwt@123')
    user.tokens.push({
        token
    })
    return user.save()
    .then (user=>{
        return Promise.resolve(token)
})
.catch(err=>{
    return Promise.reject(err)
})
}

UserSchema.statics.findByToken=function(token){
    const User=this
    let tokenData
    try{
        tokenData=jwt.verify(token,'jwt@123')
    }
    catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}

const User=mongoose.model('User',UserSchema)

module.exports={User}