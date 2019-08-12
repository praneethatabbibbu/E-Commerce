const express = require('express')
const router = express.Router()
const { OrderStatus } = require('../models/order-status')
const { authenticateUser } = require('../middleware/authenticateUser')

router.get('/', authenticateUser, (req, res) => {
    const { user } = req
    console.log(user)
    OrderStatus.find({
        user: user._id
    }).populate("user",["username"]).populate("order")
        .then(orderStatuses => res.json(orderStatuses))
        .catch(err => res.json(err))
})

router.post('/', authenticateUser, (req, res) => {
    const { user } = req
    const body = req.body
    const orderStatus = new OrderStatus(body)
    orderStatus.user = user._id
    orderStatus.save()
        .then(orderStatus => res.json(orderStatus))
        .catch(err => res.json(err))
})

router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    OrderStatus.findOne({
        _id: id,
        user: req.user._id
    })
        .then(orderStatus => {
            if (!orderStatus) {
                res.json({})
            } res.json(orderStatus)
        })
        .catch(err => res.json(err))
})

router.put('/:id', authenticateUser, (req, res) => {
    const body = req.body
    const id = req.params.id
    OrderStatus.findOneAndUpdate({
        _id: id,
        user: req.user._id
    },
        { $set: body },
        { new: true, runValidators: true })
        .then(orderStatus => {
            if (!orderStatus) {
                res.json({})
            } res.json(orderStatus)
        })
        .catch(err => res.json(err))
})

router.delete('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    OrderStatus.findOneAndDelete({
        _id: id,
        user: req.user._id
    })
        .then(orderStatus => {
            if (!orderStatus) {
                res.json({})
            } res.json(orderStatus)
        })
        .catch(err => res.json(err))
})

module.exports = {
    OrderStatusRouter: router
}