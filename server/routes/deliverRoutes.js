const express = require("express")
const router = express.Router()
const verifyJWTDeliver = require("../middleware/verifyJWTDeliver")
const verifyJWTManager = require("../middleware/verifyJWTManager")


const deliverController = require("../controllers/deliverControllers")
router.get("/",deliverController.getAllDelivers)
router.post("/",verifyJWTManager, deliverController.createNewDeliver)
router.delete("/:_id",verifyJWTManager,deliverController.deleteDeliver)
router.put("/",verifyJWTManager,deliverController.updateDeliver)


module.exports = router