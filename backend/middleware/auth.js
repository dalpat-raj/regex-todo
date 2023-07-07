const Users = require("../model/userSchema")
const jwt = require("jsonwebtoken");

exports.auth= async(req, res, next)=>{
    const {authorization} = req.headers;
    const token = authorization

    if (!token) {
        res.send({success: false, error: "token is not valid"})
      }
    
    const decodeUser = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await Users.findById(decodeUser.id)
    next();
}


