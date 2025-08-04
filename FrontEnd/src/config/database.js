const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://obitouchiha3023:TgZF8eSXRYpNMPwN@devconnect.mfdpuvr.mongodb.net/DevConnect")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;