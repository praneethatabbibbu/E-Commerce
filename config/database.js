const mongoose = require('mongoose')

mongoose.Promise=global.Promise

mongoose.connect(`mongodb://localhost:27017/e-commerce-app`, { useNewUrlParser: true })
    .then(res => {
        console.log('connecte to db successfully')
    })
    .catch(err => {
        console.log('err while connecting to db')
    })

module.exports = { mongoose }