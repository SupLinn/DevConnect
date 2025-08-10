const mongoose = require("mongoose")

const connectionReqSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["accepted", "rejected", "ignored", "interested"],
            message: `{VALUE} please entered valid status.`
        }
    }

}, {timestamps: true})

// unique fields do not require index: true, they are unique index already
connectionReqSchema.index({
    fromUserId: 1,
    toUserId: 1
})

const ConnectionReqModel= new mongoose.model("ConnectionRequest", connectionReqSchema)

module.exports = ConnectionReqModel
