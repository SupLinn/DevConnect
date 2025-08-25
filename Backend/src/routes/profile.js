const express = require("express")
const {UserAuth} = require("../middleware/auth")
const {validateEditFields} = require("../util/validate")
const bcrypt = require("bcrypt")

const profileRouter = express.Router()

profileRouter.get("/profile/view", UserAuth, async(req, res) => {
    try {
        const user = req.userProfile;
        
        res.status(200).send(user)
    } catch (error) {
        res.status(401).send("Error "+error.message);
    }

})

profileRouter.patch("/profile/edit", UserAuth, async(req, res) => {
    try {
        if(!validateEditFields(req)){
            throw new Error("Given input field is not allowed to updated!!!")
        }
        // now logic to update the allowed fields
        const user = req.userProfile;
        Object.keys(req.body).forEach((item) => user[item] = req.body[item])
        await user.save()
        res.json({message: `${user.firstName} your profile has been updated...`, data: user})
        
    } catch (error) {
        res.status(400).send("Error: "+ error.message)
    }
    
})
profileRouter.patch("/profile/edit/password" , UserAuth, async(req, res) => {
    // user must be logged In to change password
    // In Order to compare the password bcrypt to remove the hashed 
    try {
        const {currentPassword, newPassword} = req.body
        const user = req.userProfile
        if (currentPassword === newPassword) throw new Error("Require new password to update!!!")
        
        const isEqualPassword = await bcrypt.compare(currentPassword, user.password)
        const hashedPass = await bcrypt.hash(newPassword, 10);

        if (!isEqualPassword) {
           throw new Error ("your entered currentPassword is not correct!!!")
        }
        
        user.password = hashedPass
        await user.save()
        res.send(`${user.firstName} your password changed successfully...`)
    } catch (error) {
        res.status(400).send("ERROR: "+ error.message)
    }
})

module.exports = profileRouter