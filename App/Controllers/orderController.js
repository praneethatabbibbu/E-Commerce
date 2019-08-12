const express=require('express')
const {OrderItem}=require('../models/order')
const router=express.Router()
const { authenticateUser } = require('../middleware/authenticateUser')

router.get('/', authenticateUser, (req,res)=>{
    const {user}=req
    OrderItem.find({
    user:user._id
    }).populate("user", ["username"]).populate("address").populate("orderlineitem.product")
    .then(orderitems=>res.json(orderitems))
    .catch(err=>res.json(err))
})

router.post('/', authenticateUser, (req,res)=>{
    const body=req.body
    const {user}=req
    const orderitem=new OrderItem(body)
    orderitem.user=user._id
    orderitem.save()
    .then(orderitem=>res.json(orderitem))
    .catch(err=>res.json(err))
})


router.get('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    OrderItem.findOne({
        _id:id,
        user:user._id
    })
    .then(orderitem=>{
        if(!orderitem){
            res.send({})
        }else{
            res.json(orderitem)
        }
    })
    .catch(err=>res.json(err))
})
router.put('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    const body=req.body
    OrderItem.findOneAndUpdate({
        id:id,
        user:user._id},
        {$set:body},
        {new:true, runValidator:true }
    )
    .then(orderitem=>res.json(orderitem))
    .catch(err=>res.json(err))
})

router.delete('/:id', authenticateUser,(req,res)=>{
   const {user}=req
   const id=req.params.id
    OrderItem.findOneAndDelete({
        _id:id,
        user:user._id
    })
    .then(orderitem => res.json(orderitem))
    .catch(err => res.json(err))
    
})

module.exports={
    orderitemRouter:router
}