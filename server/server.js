require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 7001
const app = express()
connectDB()
const mongoose = require('mongoose')
console.log('Connected to MongoDB')

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
console.log("llllll");
app.use("/api/machines", require("./routes/machineRoutes"))
app.use("/api/manager", require("./routes/managerRoutes"))
app.use("/api/delivers", require("./routes/deliverRoutes"))
app.use("/api/machineSending", require("./routes/machineSendingRoutes"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/reportToDeliver", require("./routes/reportToDeliversRoutes"))
//routes
app.get("/", (req, res) => {
    res.send("this is the home page")
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})