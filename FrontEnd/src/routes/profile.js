const express = require("express")
const {UserAuth} = require("../middleware/auth")

const profileRouter = express.Router()

profileRouter.get("/profile", UserAuth, async(req, res) => {
    try {
        const user = req.userProfile;
        
        res.send(user)
    } catch (error) {
        res.status(400).send("Error "+error.message);
    }

})

module.exports = profileRouter