const express = require("express")
const router = express.Router()
const verifyJWTDeliver = require("../middleware/verifyJWTDeliver")
const verifyJWTManager = require("../middleware/verifyJWTManager")

const authController = require("../controllers/authController")
router.post("/login", authController.login)
router.post("/registerManager",authController.registerManager)
router.post("/registerDeliver", authController.registerDeliver)

module.exports = router