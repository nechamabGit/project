const express = require("express")
const router = express.Router()
const verifyJWTDeliver = require("../middleware/verifyJWTDeliver")
const verifyJWTManager = require("../middleware/verifyJWTManager")

const machineController = require("../controllers/machineController")
router.get("/",machineController.getAllMachines)
router.get("/:id", machineController.getMachineById)
router.post("/", machineController.createNewMachine)
router.delete("/:_id",verifyJWTDeliver,machineController.deleteMachine)
router.put("/",machineController.updateMachine)
// router.put("/updateMachineDeliver/:id",machineController.updateMachineDeliver)


module.exports = router