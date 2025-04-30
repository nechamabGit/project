const mongoose = require('mongoose')
deliverSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    name:{
        type:mongoose.Schema.Types.String,
        required:false,
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    area:{
        type:mongoose.Schema.Types.String,
        required:true,
    }
    // machinesArr:{
    //     type:[string],
    //     required:true, 
    // }
},{
timestamps:true
})
module.exports = mongoose.model('Deliver', deliverSchema)