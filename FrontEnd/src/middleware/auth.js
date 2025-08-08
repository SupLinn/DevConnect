const jwt = require("jsonwebtoken")
const User = require("../models/user");

const UserAuth = async (req, res, next) => {
    try {
        const {tokenName} = req.cookies;
        
        if(!tokenName) throw new Error ("Token not found or Invalid token!!!")
    
        // now using this token to verify JWT secret
        const decodeObj = await jwt.verify(tokenName, "SEC$08PASS");
    
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