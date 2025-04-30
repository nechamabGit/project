const mongoose = require('mongoose')

machineSendingSchema = new mongoose.Schema({

    idMachine: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Machine"
    },
    amountBuying: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    amountLeft  : {
        type: Number,
        required: true,
    },
    last_Hour_Active: {
        type: Number,
        required: true,
        default: 12
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('MachineSending', machineSendingSchema)