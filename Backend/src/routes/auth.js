const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {validateUserSignup} = require("../util/validate")

const authRouter = express.Router()

authRouter.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;
        // first we will be verifying email and then check for the password
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).send("ERROR: Invalid Credentials!!!")
        } 

        // now check for the password
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword){
            return res.status(400).send("ERROR: Invalid Credentials!!!")
        }
        else{
            // sending jwt token into cookies
            const token = await jwt.sign({Id: user._id}, "SEC$08PASS")
            res.cookie("tokenName", token)

            res.send(user) 
        }
        
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

authRouter.post("/signup", async (req, res) => {
    // dont take direct data from req.body as it is not safe
    try {
        validateUserSignup(req);

        const {firstName, lastName, email, password, age, gender, skills} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const dummyUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age,
            gender,
            skills
        })

        const savedUser = await dummyUser.save();

        const token = await jwt.sign({Id: savedUser._id}, "SEC$08PASS")
        res.cookie("tokenName", token)

        res.json({
            message:"User saved successfully...",
            data: savedUser
        })


    } catch (error) {
        res.status(400).send("User not saved!!! "+ error.message);
    }
})

authRouter.post("/logout", async(req, res) => {
    res.cookie("tokenName", null, {expires: new Date(Date.now())})
    res.send("Logged Out Successfully!!!")
})

module.exports = authRouter