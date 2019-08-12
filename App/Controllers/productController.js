const express=require('express')
const {Product}=require('../models/product')
const router=express.Router()
const { authenticateUser }=require('../middleware/authenticateUser')
const { authouriesUser } = require('../middleware/adminauthorise') 


router.get('/',(req,res)=>{
    Product.find({
    }).populate("category",["name"])
    .then(products=>res.json(products))
    .catch(err=>res.json(err))
})

router.post('/', authenticateUser, authouriesUser,(req,res)=>{
    const {user}=req
    const body=req.body
    const product=new Product(body)
    product.user=user._id
    product.save()
    .then(product=>res.json(product))
    .catch(err=>res.json(err))
})

router.get('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    product.findOne({
        _id:id,
        user:req.user._id
    })
    .then(product=>res.json(product))
    .then(err=>res.json(err))
})

router.put('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    Product.findOneAndUpdate({
        _id:id,
        user:req.user._id},
        body,{new:true, runValidators:true})
    .then(product => res.json(product))
    .then(err => res.json(err))
})

router.delete('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    Product.findByIdAndDelete({
        _id:id,
        user:req.user._id
    
    })
    .then(product => res.json(product))
    .then(err => res.json(err))   
})

module.exports={
    productRouter:router
}