const express = require("express")
const app = express();
const path = require("path");
const dbConnection = require("./config/dbConnction");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const cors = require("cors");

// Config
require("dotenv").config({ path: "../backend/config/config.env" })

// Database Connection
dbConnection()
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());



// Routes Imports
const user = require("./routes/userRoutes")
const task = require("./routes/taskRoutes")

app.use(user)
app.use(task)


const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on PORT = ${process.env.PORT}`);
})
