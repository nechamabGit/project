const Manager = require("../models/Manager")
const Deliver= require("../models/Deliver")
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')

const login = async (req,res)=>{ 
    
        const { username, password } = req.body
       
            if (!username || !password) {
            return res.status(400).json({message:'All fields are required'})
            }
            const foundManager = await Manager.findOne({username}).lean() 
            const foundDeliver = await Deliver.findOne({username}).lean() 
           
                if (!foundManager && !foundDeliver) {
                    return res.status(401).json({ message: 'Unauthorized' })
                    }
                if(foundManager){
                    const match = await bcrypt.compare(password, foundManager.password)
                    if(!match) return res.status(401).json({message:'Unauthorized' })
                        const managerInfo= {_id:foundManager._id,
                            username:foundManager.username,
                            role:"manager"
                            }
                        const accessToken=
                        jwt.sign(managerInfo,process.env.ACCESS_TOKEN_SECRET)
                        res.json({accessToken:accessToken,user:managerInfo}) 
                } 
                if(foundDeliver){
                    const match = await bcrypt.compare(password, foundDeliver.password)
                    if(!match) return res.status(401).json({message:'Unauthorized' })
                        const deliverInfo= {_id:foundDeliver._id,name:foundDeliver.name,
                         username:foundDeliver.username,area:foundDeliver.area,
                            email:foundDeliver.email,
                            role:"deliver"}
                            const accessToken=
                    jwt.sign(deliverInfo,process.env.ACCESS_TOKEN_SECRET)
                    res.json({accessToken:accessToken,user:deliverInfo})
                } 
}

const registerManager = async (req,res)=>{
    console.log("aaaaaaaa");
    const {username, password} = req.body
    
    if (!username || !password) {// Confirm data
    return res.status(400).json({message:'All fields are required'})
    }
    const duplicate = await Deliver.findOne({username:username}).lean()
    if(duplicate){
    return res.status(409).json({message:"Duplicate username"})
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const managerObject= {username,password:hashedPwd}
    const manager = await Manager.create(managerObject)
    if (manager) { // Created
    return res.status(201).json({message:`New manager ${manager.username}
    created` })
    } else {
    return res.status(400).json({message:'Invalid manager received'})
    }
}

const registerDeliver = async (req,res)=>{
    const {username, password,name,email,area} = req.body
    
    if (!username || !password ||!email || !area) {// Confirm data
    return res.status(400).json({message:'All fields are required'})
    }
    // const duplicateManager = await Deliver.findOne({username:username}).lean()
    
    // if(duplicateManager){
    //     return res.status(409).json({message:"Duplicate Managerusername"})
    // }
    const duplicateDeliver = await Manager.findOne({username:username}).lean()
    if(duplicateDeliver){
    return res.status(409).json({message:"Duplicate Deliverusername"})
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const deliverObject= {username,password:hashedPwd,name,email,area}
    const deliver = await Deliver.create(deliverObject)
    if (deliver) { // Created
        res.send(deliver)
    } else {
    return res.status(400).json({message:'Invalid deliver received'})
    }
}

module.exports = {login, registerManager, registerDeliver}