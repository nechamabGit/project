const Deliver = require("../models/Deliver");

const createNewDeliver = async (req, res) => {
    const {username,password,name,email,area} = req.body//,machinesArr
    console.log(area);
    if (!username || !password || !email || !area  ){//|| !machinesArr) { // Confirm data
    return res.status(400).json({ message: 'all is required' })}
    // Create and store the new deliver
    const deliver = await Deliver.create({username,password,name,email,area//,machinesArr
    })
    
    if (deliver) { // Created
    return res.status(201).json({ message: 'New deliver created' })
    } else {
    return res.status(400).json({ message: 'Invalid deliver ' })}}
    
    //get
    const getAllDelivers = async (req, res) => {
        // Get all Delivers from MongoDB
        const Delivers = await Deliver.find().lean()
        // If no delivers
        if (!Delivers?.length) {
        return res.status(400).json({ message: 'No Delivers found' })
        }
        res.json(Delivers)
        }

//update
        const updateDeliver = async (req, res) => {
            const {_id,username,password,name,email,area}= req.body //,machinesArr
            // Confirm data
            if (!_id || !username || !password || !email || !area ){//|| !machinesArr) {
            return res.status(400).json({ message: 'fields are required' })
            }
            // Confirm deliver exists to update
            const deliver = await Deliver.findById(_id).exec()
            if (!deliver) {
            return res.status(400).json({ message: 'Deliver not found' })
            }
            deliver.username = username
            deliver.password = password
            deliver.email = email
            deliver.area = area
            //deliver.machinesArr = machinesArr
            const updateDeliver = await deliver.save()
            res.json(`'${updateDeliver.username}' updated`)
            }

            //delete
            const deleteDeliver = async (req, res) => {
                const {_id} = req.params
                // Confirm deliver exists to delete
                const deliver = await Deliver.findById(_id).exec()
                if (!deliver) {
                return res.status(400).json({ message: 'deliver not found' })
                }
                const result = await deliver.deleteOne()
             const reply=`ID ${result._id} deleted`
                const delivers = await Deliver.find().lean()
                res.json(delivers)
                }
        
               
                
    //getbyid
                const getDeliverById = async (req, res) => {
                    const {_id} = req.params
                    // Get single deliver from MongoDB
                    const deliver = await Deliver.findById(_id).lean()
                    // If no delivers
                    if (!deliver) {
                    return res.status(400).json({ message: 'No deliver found' })
                    }
                    res.json(deliver)
                    }
                   
                     
                    module.exports = {
                        getAllDelivers,
                        createNewDeliver,
                        getDeliverById,
                        updateDeliver,   
                        deleteDeliver
                        }