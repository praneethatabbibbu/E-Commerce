const express=require('express')
const router=express.Router()
const {Review}=require('../models/review')
const { authouriesUser } = require('../middleware/adminauthorise')
const { authenticateUser } = require('../middleware/authenticateUser')

router.get('/',(req,res)=>{
    Review.find({
    }).populate("user",["username"]).populate("product")
    .then(reviews=>res.json(reviews))
    .catch(err=>res.json(err))
})

router.post('/', authenticateUser, authouriesUser,(req,res)=>{
    const body=req.body
    const {user}=req
    const review=new Review(body)
    review.user=user._id
    review.save()
    .then(review=>res.json(review))
    .catch(err=>res.json(err))
})

router.delete('/:id', authouriesUser ,(req,res)=>{
    const id=req.params.id
    Review.findOneAndDelete({
        _id:id,
        user:user._id
    })
    .then(review => res.json(review))
    .catch(err => res.json(err))
})

module.exports={
    reviewRouter:router
}