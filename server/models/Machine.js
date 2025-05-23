const mongoose = require('mongoose')

machineSchema = new mongoose.Schema({
    machineName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    idDeliver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Deliver"
    },
    area: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    neighborhood: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    maxItems: {
        type: Number,
        required: true,
    },
    minItems: {
        type: Number,
        required: true,
    },
    require_Hour_Active: {
        type: Number,
        min: 0,
        max: 24,
        required: true,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Machine', machineSchema)