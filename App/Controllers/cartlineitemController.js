const express = require('express')
const router = express.Router()
const { CartItem } = require('../models/cartlineitem')
const { authenticateUser } = require('../middleware/authenticateUser')


router.get('/', authenticateUser, (req, res) => {
    const { user } = req
    CartItem.find({
        user:user._id
    }).populate("user",["username"]).populate("product")
        .then(cartitems => res.json(cartitems))
        .catch(err => res.json(err))
})

router.post('/', authenticateUser, (req, res) => {
    const body = req.body
    const { user } = req
    const cartItem = new CartItem(body)
    cartItem.user = user._id
    cartItem.save()
        .then(cartItem => res.json(cartItem))
        .catch(err => res.json(err))
})

router.get('/:id', authenticateUser, (req, res) => {
    const { user } = req
    const id = req.params.id
    CartItem.findOne({
        _id: id,
        user: user._id
    })
        .then(cartItem => res.json(cartItem))
        .catch(err => res.json(err))
})

router.put('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    const body = req.body
    CartItem.findOneAndUpdate({
        _id: id,
        user: user._id
    },
        body,
        { new: true, runValidators: true })
        .then(cartItem => {
            if (!cartItem) {
                res.json({})

            } res.json(cartItem)
        })
        .catch(err => res.json(err))
})

router.delete('/:id', authenticateUser,(req, res) => {
    const id = req.params.id
    const { user } = req
    CartItem.findOneAndDelete({
        _id: id,
        user: user._id
    })
        .then(cartItem => {
            if (!cartItem) {
                res.json({})

            } res.json(cartItem)
        })
        .catch(err => res.json(err))

})

module.exports = {
    cartLineItemRouter: router
}
