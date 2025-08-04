const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        require: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true,
        enum: ["male", "female", "trans"]
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;