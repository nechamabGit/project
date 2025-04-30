const express = require("express")
const router = express.Router()
const verifyJWTDeliver = require("../middleware/verifyJWTDeliver")
const verifyJWTManager = require("../middleware/verifyJWTManager")

const machineSendingController = require("../controllers/machineSendingController")
router.get("/",machineSendingController.getAllMachineSendings)
router.get("/:id", machineSendingController.getMachineSendingById)
router.post("/", machineSendingController.createNewMachineSending)
router.delete("/",machineSendingController.deleteMachineSending)
//router.put("/",machineSendingController.updateMachineSending)


module.exports = router