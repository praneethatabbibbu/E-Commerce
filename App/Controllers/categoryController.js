const express=require('express')
const router=express.Router()
const {Category}=require('../models/category')
const { authouriesUser }=require('../middleware/adminauthorise')
const { authenticateUser }=require('../middleware/authenticateUser')


router.get('/', authenticateUser,(req,res)=>{
    const {user}=req
    Category.find({
        user:user._id
    })
        .then(categories=> res.json(categories))
        .catch(err=> res.json(err))
})

router.post('/', authenticateUser, authouriesUser,(req,res)=>{
    const body=req.body
    const {user}=req
    const category=new Category(body)
    category.user=user._id
    category.save()
    .then(category=> res.json(category))
    .catch(err=>res.json(err))
})

router.get('/:id',(req,res)=>{
    const body=req.body
    const id=req.params.id
    Category.findById(id)
    .then(category=> res.json(category))
    .catch(err=> res.json(err))
})

module.exports={
    categoryRouter:router
}