const MachineSending = require("../models/MachineSending");

const createNewMachineSending = async (req, res) => {
    console.log("start");
    
    const { idMachine, amountBuying, amountLeft, last_Hour_Active } = req.body//,machinesArr
    console.log(last_Hour_Active);
    console.log(amountLeft);
    console.log(amountBuying);
    console.log(idMachine);
    
    if (!idMachine || !amountBuying || !amountLeft || !last_Hour_Active) {//|| !machinesArr) { // Confirm data
        return res.status(400).json({ message: 'all is required' })
    }
    // Create and store the new machineSending
    const machineSending = await MachineSending.create({ idMachine, amountBuying, amountLeft, last_Hour_Active })

    if (machineSending) { // Created
        return res.status(201).json({ message: 'New machineSending created' })
    } else {
        return res.status(400).json({ message: 'Invalid machineSending ' })
    }
}

//get
const getAllMachineSendings = async (req, res) => {
    // Get all MachineSendings from MongoDB
    const MachineSendings = await MachineSending.find()
        .populate({
            path: 'idMachine',
            populate: { path: 'idDeliver' } // Populate idDeliver from idMachine
        })
        .lean();
    // If no machineSendings
    if (!MachineSendings?.length) {
        return res.status(400).json({ message: 'No MachineSendings found' })
    }
    res.json(MachineSendings)
}

// //update
//         const updateMachineSending = async (req, res) => {
//             const {_id,username,password,name,email,area}= req.body //,machinesArr
//             // Confirm data
//             if (!_id || !username || !password || !email || !area ){//|| !machinesArr) {
//             return res.status(400).json({ message: 'fields are required' })
//             }
//             // Confirm machineSending exists to update
//             const machineSending = await MachineSending.findById(_id).exec()
//             if (!machineSending) {
//             return res.status(400).json({ message: 'MachineSending not found' })
//             }
//             machineSending.username = username
//             machineSending.password = password
//             machineSending.email = email
//             machineSending.area = area
//             //machineSending.machinesArr = machinesArr
//             const updateMachineSending = await machineSending.save()
//             res.json(`'${updateMachineSending.username}' updated`)
//             }

//delete
const deleteMachineSending = async (req, res) => {
    const { _id } = req.body
    // Confirm machineSending exists to delete
    const machineSending = await MachineSending.findById(_id).exec()
    if (!machineSending) {
        return res.status(400).json({ message: 'machineSending not found' })
    }
    const result = await machineSending.deleteOne()
    const reply = `ID ${result._id} deleted`
    res.json(reply)
}


//getbyid
const getMachineSendingById = async (req, res) => {
    const { _id } = req.params
    // Get single machineSending from MongoDB
    const MachineSendings = await MachineSending.find(_id)
    .populate({
        path: 'idMachine',
        populate: { path: 'idDeliver' } // Populate idDeliver from idMachine
    })
    .lean();    // If no machineSendings
    if (!machineSending) {
        return res.status(400).json({ message: 'No machineSending found' })
    }
    res.json(machineSending)
}


module.exports = {
    getAllMachineSendings,
    createNewMachineSending,
    getMachineSendingById,
    //     updateMachineSending,   
    deleteMachineSending
}