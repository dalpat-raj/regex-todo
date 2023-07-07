const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})



userschema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

// Compare Password
userschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



const Users = mongoose.model("users", userschema)
module.exports = Users;