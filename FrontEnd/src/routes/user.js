const express = require("express")
const { UserAuth } = require("../middleware/auth");
const ConnectionReqModel = require("../models/connectionRequest");
const User = require("../models/user");

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

userRouter.get("/user/feed", UserAuth, async(req, res) => {
    try{
        // pagination logic
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;

        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;


        const user = req.userProfile;
        const SAFE_FIELDS = ["firstName", "lastName", "age", "gender", "about", "skills", "photoUrl"];

        const hiddenProfileForUser = await ConnectionReqModel.find({
            $or:[
                {fromUserId: user._id},
                {toUserId: user._id}
            ]
        }).select("fromUserId toUserId")

        const ProhibitedUserId = new Set();
        
        hiddenProfileForUser.forEach((item) => {
            ProhibitedUserId.add(item.fromUserId.toString());
            ProhibitedUserId.add(item.toUserId.toString());
        })

        const data = await User.find ({
            $and: [
                {_id: {$nin : Array.from(ProhibitedUserId)} },
                {_id: {$ne : user._id}}
            ]
        })
        .select(SAFE_FIELDS)
        .skip(skip)
        .limit(limit)

        res.status(200).json({
            data
        })
    } catch(err) {
        res.status(400).send("Error: "+ err.message)
    }
})

module.exports = userRouter