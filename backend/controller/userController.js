const Users = require("../model/userSchema")
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'

// Sign_Up User
exports.signUp = async(req, res, next)=>{
    const {name, email, password} = req.body;

    if(email && password){
        const user = await Users.findOne({email: email})
        if(user){
            res.send({success: false, message: "user allready exits"})
        }else{
            const user = await Users.create({
                name,
                email, 
                password
            })
            res.send({success: true, message: "signup succesfully"})
        }
    }else{
        res.send({success: false, message: "no data found"})
    }
}


// Login User
exports.login = async (req, res, next)=>{
    const {email, password} = req.body;
    if(email && password){
        const user = await Users.findOne({email});
        if(user){
            const isPasswordMatched = await user.comparePassword(password);
            if(isPasswordMatched){
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
                res.send({
                    message: "login success",
                    token
                })

            }else{
                res.send({success: false, message: "invalid password"})
            }
        }else{
            res.send({success: false, message: "user not found"})
        }
    }else{
        res.send({success: false, message: "data not found"})
    }
}


//logout 
exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  };
