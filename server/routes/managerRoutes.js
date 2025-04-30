const express = require("express")
const router = express.Router()
const verifyJWTDeliver = require("../middleware/verifyJWTDeliver")
const verifyJWTManager = require("../middleware/verifyJWTManager")

const managerController = require("../controllers/managerControllers")
console.log("uuuu");

router.get("/",verifyJWTManager,managerController.getAllManagers)
router.post("/",verifyJWTManager, managerController.createNewManager)
router.delete("/",verifyJWTManager,managerController.deleteManager)
router.put("/",verifyJWTManager,managerController.updateManager)


module.exports = router