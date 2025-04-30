const mongoose = require('mongoose')
managerSchema = new mongoose.Schema({

username:{
    type:mongoose.Schema.Types.String,
    required:true,
},
password:{
    type:mongoose.Schema.Types.String,
    required:true,
}
},{
timestamps:true
})
module.exports = mongoose.model('Manager', managerSchema)