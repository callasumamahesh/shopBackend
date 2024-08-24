const mongoose = require('mongoose');
const InstaUser = mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    Name : {
        type:String,
        required:true
    }
})

const Users = mongoose.model('Users' , InstaUser)

module.exports = Users;