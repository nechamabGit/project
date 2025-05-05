const Machine = require("../models/Machine");

const createNewMachine = async (req, res) => {
    console.log("llllll");
    const { machineName, idDeliver, area, neighborhood, address, minItems,maxItems , require_Hour_Active } = req.body
    if (!machineName ||!idDeliver||!area || !neighborhood || !address || !maxItems || !minItems || !require_Hour_Active) { // Confirm data
        return res.status(400).json({ message: 'all is required' })
    }
    // Create and store the new machine
    const machine = await Machine.create({
        machineName, idDeliver, area, neighborhood, address, maxItems,
        minItems, require_Hour_Active
    })

    if (machine) { // Created
        return res.status(201).json({ message: 'New machine created' })
    } else {
        return res.status(400).json({ message: 'Invalid machine ' })
    }
}

//get
const getAllMachines = async (req, res) => {
    // Get all Machines from MongoDB
    const Machines = await Machine.find().populate('idDeliver').lean()
    // If no machines
    if (!Machines?.length) {
        return res.status(400).json({ message: 'No Machines found' })
    }
    res.json(Machines)
}
const updateMachineDeliver = async (req, res) => {
    const { id } = req.params

    const { newId } = req.body

    const machine = await Machine.find({ idDeliver: id }).exec()
    if (!machine) {
        return res.status(400).json({ message: 'Machine not found' })
    }
    machine.map(async (item) => {
        console.log(item);
        item.idDeliver = newId;
        await item.save();
    })

    res.send('updated')
}

//update
const updateMachine = async (req, res) => {
    const {machineName, idDeliver, area, neighborhood, address, maxItems, minItems, require_Hour_Active } = req.body
    // Confirm data
    console.log(kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk);
    if (!idDeliver||!machineName || !area || !neighborhood || !address || !maxItems || !minItems || !require_Hour_Active) {
        return res.status(400).json({ message: 'fields are required' })
    }
    // Confirm machine exists to update
    const machine = await Machine.findById(_id).exec()
    if (!machine) {
        return res.status(400).json({ message: 'Machine not found' })
    }
    machine.machineName = machineName
    machine.idDeliver = idDeliver
    machine.area = area
    machine.neighborhood = neighborhood
    machine.address = address
    machine.maxItems = maxItems
    machine.minItems = minItems
    machine.require_Hour_Active = require_Hour_Active
    const updateMachine = await machine.save()
    res.json(`'${updateMachine.machineName}' updated`)
}

//delete
const deleteMachine = async (req, res) => {
    const { _id } = req.params
    // Confirm machine exists to delete
    const machine = await Machine.findById(_id).exec()
    if (!machine) {
        console.log("hgjhjgjgjhgjhjgj")
        return res.status(400).json({ message: 'machine not found' })
    }
    const result = await machine.deleteOne()
    const reply = `ID ${result._id} deleted`
    res.json(reply)
    const machines = await Deliver.find().lean()
    res.json(machines)
}


//getbyid
const getMachineById = async (req, res) => {
    const { id } = req.params
    console.log(id);

    // Get single machine from MongoDB
    const machine = await Machine.findById(id).populate('idDeliver').lean()
    console.log(machine);
    // If no machines
    if (!machine) {
        return res.status(400).json({ message: 'No machine found' })
    }
    res.json(machine)
}

module.exports = {
    getAllMachines,
    createNewMachine,
    getMachineById,
    updateMachine,
    deleteMachine,
    updateMachineDeliver
}