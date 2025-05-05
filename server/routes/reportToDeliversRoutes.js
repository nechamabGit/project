const express = require("express")
const router = express.Router()
const verifyJWTDeliver = require("../middleware/verifyJWTDeliver")
const verifyJWTManager = require("../middleware/verifyJWTManager")

const reportToDeliverController = require("../controllers/reportToDeliverController")
router.get("/",reportToDeliverController.getAllReportToDeliver)
console.log("tttttttttt")
router.get("/byid",verifyJWTDeliver,reportToDeliverController.getReportToDeliverById)
router.post("/", reportToDeliverController.createNewReportToDeliver)
router.delete("/:_id",reportToDeliverController.deleteReportToDeliver)
router.put("/",reportToDeliverController.updateReportToDeliver)


module.exports = router