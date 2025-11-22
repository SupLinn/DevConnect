const jwt = require("jsonwebtoken")
const User = require("../models/user");
require("dotenv").config();

const UserAuth = async (req, res, next) => {
    try {
        const {tokenName} = req.cookies;
        
        if(!tokenName){
            return res.status(401).send("Token expired, Please login again !!!")
        }
    
        // now using this token to verify JWT secret
        const decodeObj = await jwt.verify(tokenName, process.env.JWT_SECRET);
    
        // getting _id from this decodeObj
        const {Id} = decodeObj
    
        // now finding the user from this id 
        const user = await User.findById(Id)
    
        if (!user) throw new Error("User not found!!!")

        // now sending the user into the req for the next req handler
        req.userProfile = user;
        next()
    } catch (error) {
        res.status(400).send("ERROR "+ error.message)
    }
}

module.exports = {
    UserAuth,
}