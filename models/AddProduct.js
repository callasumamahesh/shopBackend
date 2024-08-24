const mongoose = require('mongoose');
const AddProduct = mongoose.Schema({
    ProductTitle:{
        type:String
    },
    ProductDescription:{
        type:String
    },
    ProductPrice:{
        type:Number
    },
    ProductDiscount:{
        type:String
    },
    ProductCategory:{
        type:String
    },
    ProductImage:{
        type:String
    }
})

const NewProduct = mongoose.model('NewProduct',AddProduct)

module.exports =  NewProduct;