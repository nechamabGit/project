const Manager = require("../models/Manager");
console.log("uoooo");
const createNewManager = async (req, res) => {
    const {username,password} = req.body
    if (!username || !password) { // Confirm data
    return res.status(400).json({ message: 'all is required' })}
    // Create and store the new manager
    const manager = await Manager.create({username,password
    })
    
    if (manager) { // Created
    return res.status(201).json({ message: 'New manager created' })
    } else {
    return res.status(400).json({ message: 'Invalid manager ' })}}
    
    //get
    const getAllManagers = async (req, res) => {
        // Get all Managers from MongoDB
        const Managers = await Manager.find().lean()
        // If no managers
        if (!Managers?.length) {
        return res.status(400).json({ message: 'No Managers found' })
        }
        res.json(Managers)
        }

//update
        const updateManager = async (req, res) => {
            const {_id,username,password}= req.body
            // Confirm data
            if (!_id || !username || !password) {
            return res.status(400).json({ message: 'fields are required' })
            }
            // Confirm manager exists to update
            const manager = await Manager.findById(_id).exec()
            if (!manager) {
            return res.status(400).json({ message: 'Manager not found' })
            }
            manager.username = username
            manager.password = password
            const updateManager = await manager.save()
            res.json(`'${updateManager.username}' updated`)
            }

            //delete
            const deleteManager = async (req, res) => {
                const {_id} = req.body
                // Confirm manager exists to delete
                const manager = await Manager.findById(_id).exec()
                if (!manager) {
                return res.status(400).json({ message: 'manager not found' })
                }
                const result = await manager.deleteOne()
                const reply=`ID ${result._id} deleted`
                res.json(reply)
                }
        
    
    // //getbyid
    //             const getManagerById = async (req, res) => {
    //                 const {_id} = req.params
    //                 // Get single manager from MongoDB
    //                 const manager = await Manager.findById(_id).lean()
    //                 // If no managers
    //                 if (!manager) {
    //                 return res.status(400).json({ message: 'No manager found' })
    //                 }
    //                 res.json(manager)
    //                 }
                   
                     
                    module.exports = {
                        getAllManagers,
                        createNewManager,
                        // getManagerById,
                        updateManager,
                        
                        deleteManager
                        }