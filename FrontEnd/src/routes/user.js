const express = require("express")
const { UserAuth } = require("../middleware/auth");
const ConnectionReqModel = require("../models/connectionRequest");

const userRouter = express.Router()

userRouter.get("/user/requests/received", UserAuth, async(req, res) => {
    // requirement of this api is to show all (list) the pending req to the loggedIn user
    try {
        // this will give the info about the loggedIn user
        const user = req.userProfile;
        // db query
        const requestList = await ConnectionReqModel.find({
            toUserId : user._id,
            status : "interested"
        }).populate(  // learn about this populate method
            "fromUserId",
            "firstName lastName age gender skills about photoUrl"
        )

        res.status(200).json({
            message: "Pending Request you have...",
            data : requestList
        })

    } catch (error) {
        res.status(400).send("Error: "+error)
    }
})

userRouter.get("/user/connections", UserAuth, async(req, res) => {
    try {
        const user = req.userProfile;
        const SAFE_FIELDS = ["firstName", "lastName", "age", "gender", "about", "skills", "photoUrl"]
        
        const connectionList = await ConnectionReqModel.find({
            $or: [
                {toUserId: user._id, status: "accepted"},
                {fromUserId: user._id, status: "accepted"}
            ]
        }).populate(
            "fromUserId",
            SAFE_FIELDS
        ).populate(
            "toUserId",
            SAFE_FIELDS
        )
        const data = connectionList.map((item) => {
            if(item.toUserId._id.toString() === user._id.toString()){
                return item.fromUserId
            }
            else{
                return item.toUserId
            }
        })
        res.status(200).json({
            data
        })

    } catch (error) {
        res.status(400).send("Error: "+ error)
    }
})

module.exports = userRouter