const mongoose = require('mongoose')
const AddCart = mongoose.Schema({
    imagefordatabase:{
        type:String,
        required:true,
    },
    title: {
        type:String,
        required:true,
    },
    price : {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Uniqueid : {
        type:Number,
    }
})

const AddtoCart = mongoose.model('AddtoCart',AddCart)
module.exports = AddtoCart