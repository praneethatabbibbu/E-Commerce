const express=require('express')
const router=express.Router()
const {Address}=require('../models/address')
const { authenticateUser }=require('../middleware/authenticateUser')

router.get('/', authenticateUser,(req,res)=>{
    const {user}=req
    Address.find({
        user:user._id
    }).populate("user",["username"])
    .then(addresses=> res.json(addresses))
    .catch(err=>res.json(err))
})

router.post('/', authenticateUser,(req,res)=>{
    const {user}=req    
    const body=req.body
    const address=new Address(body)
    address.user=user._id
    address.save()
    .then(address=>res.json(address))
    .catch(err=>res.json(err))
})

router.get('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    Address.findOne({
        _id:id,
        user:req.user._id
    })
    .then(address =>{
        if(!address){
            res.json({})
        } res.json(address)
    })
    .catch(err => res.json(err))
})

router.put('/:id', authenticateUser,(req,res)=>{
    const body=req.body
    const id=req.params.id
    Address.findOneAndUpdate({
        _id:id,
        user: req.user._id},
        {$set:body},
        {new:true,runValidators:true})
    .then(address =>{
        if (!address) {
            res.json({})
    } res.json(address)
})
    .catch(err => res.json(err))
})

router.delete('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    Address.findOneAndDelete({
        _id:id,
        user:req.user._id
    })
    .then(address =>{
        if (!address) {
            res.json({})
    } res.json(address)
    })
    .catch(err => res.json(err))
})

module.exports={
    AddressRouter:router
}