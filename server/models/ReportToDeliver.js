const mongoose = require('mongoose')
const Machine = require('./Machine')

reportToDeliverSchema = new mongoose.Schema({
    idMachine: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Machine"
    },
    // idDeliver:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref: "Deliver"
    // },
    countFilling: {
        type: Number,
        required: true,
    },
    complete:{
        type:Boolean,
        required: true,
    },
    message:{
        type: mongoose.Schema.Types.String,
        required: false,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('ReportToDeliver', reportToDeliverSchema)