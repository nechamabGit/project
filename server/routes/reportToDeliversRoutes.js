const express = require("express")
const router = express.Router()
const verifyJWTDeliver = require("../middleware/verifyJWTDeliver")
const verifyJWTManager = require("../middleware/verifyJWTManager")

const reportToDeliverController = require("../controllers/reportToDeliverController")
router.get("/",reportToDeliverController.getAllReportToDeliver)
console.log("tttttttttt");
router.get("/byid",verifyJWTDeliver,reportToDeliverController.getReportToDeliverById)
router.post("/",verifyJWTManager, reportToDeliverController.createNewReportToDeliver)
router.delete("/:_id",verifyJWTManager,reportToDeliverController.deleteReportToDeliver)
router.put("/",verifyJWTManager,reportToDeliverController.updateReportToDeliver)


module.exports = router