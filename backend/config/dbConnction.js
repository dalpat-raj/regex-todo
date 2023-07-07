const mongoose = require("mongoose")

const url = "mongodb://127.0.0.1:27017/regex"

const dbConnection=()=>{
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("mongoose connect");
    }).catch((err)=>{
        console.log("err mongoose");
    })
}


module.exports = dbConnection;