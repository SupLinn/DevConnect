const express = require("express");
const { UserAuth } = require("../middleware/auth");
const ConnectionReqModel = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", UserAuth, async(req, res) => {
    try {

        // fromUserId is logged In user id and toUserId can be found by params
        const senderUserId = req.userProfile._id;
        const receiverUserId = req.params.userId;
        const state = req.params.status

        // now taking care of edge cases, check for all the input fields 
        // for receiverUserId check 
        const findReceiveruserId = await User.findById(receiverUserId)
        if (!findReceiveruserId) throw new Error ("Invalid connection Id User does not exits!!!")

        // Logged In user can not send connection request to itself
        if (senderUserId.toString() === receiverUserId) throw new Error("Sending connection Req to yourself is not allowed!!!")

        // check if the state is entered correctly
        const isAllowedState = ["ignored", "interested"]
        if (!isAllowedState.includes(state)){
            return res.status(400).json({
                message: "Invalid status type "+state
            })
        }
        // if interested connection is present between A and B then send interested connection req should not be possible 
        const existingConnectionRequest = await ConnectionReqModel.findOne({
            $or: [
                {
                    fromUserId : senderUserId,
                    toUserId : receiverUserId
                },
                {
                    toUserId: senderUserId,
                    fromUserId : receiverUserId
                }
            ]
        })
        if (existingConnectionRequest) throw new Error("Connection between the Users already exists!!!")

        // now creating new instance of the connectionRequest Schema
        const connectionReq = new ConnectionReqModel({
            fromUserId : senderUserId,
            toUserId : receiverUserId,
            status : state
        })
        
        // now save the instance in the database
        const data = await connectionReq.save();

        res.json({
            message: "Connection Resquest sent Successfully...",
            data
        })
    } catch (error) {
        res.status(400).send("Error: "+ error.message)
    }
})

requestRouter.patch("/request/review/:status/:requestId", UserAuth, async(req, res) => {
    // take the loggedIn user from the userAuth req
    // validation required on satus and requestId (anything which comes from the req.body or the url validation is required)
    try {
        const {status, requestId} = req.params;
    
        const loggedInUser = req.userProfile;
        const allowedStatus = ["accepted", "rejected"]
        if (!allowedStatus.includes(status)) {
            res.status(400).json({
                message: "Invalid status request!!!"
            })
        }
    
        // now comes db query
    
        const validateRequest = await ConnectionReqModel.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        })
        // console.log (validateRequest)
    
        if (!validateRequest){
            res.status(404).json({
                message: "No request found!!!",
            })
        }
        validateRequest.status = status
        const data = await validateRequest.save();
        res.status(200).json ({
            message: "Connection request "+status,
            data
        })
    } catch (error) {
        res.status(400).send("Error: "+ error);
    }
    
})


module.exports = requestRouter