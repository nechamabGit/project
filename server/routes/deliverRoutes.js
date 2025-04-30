const express = require("express")
const router = express.Router()
const verifyJWTDeliver = require("../middleware/verifyJWTDeliver")
const verifyJWTManager = require("../middleware/verifyJWTManager")


const deliverController = require("../controllers/deliverControllers")
router.get("/",deliverController.getAllDelivers)
router.post("/", deliverController.createNewDeliver)
router.delete("/:_id",deliverController.deleteDeliver)
router.put("/",deliverController.updateDeliver)


module.exports = router