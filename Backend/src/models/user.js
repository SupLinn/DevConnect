const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        maxLength : 20
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trime: true,
        validate(value){
            if (!validator.isEmail(value)) throw new Error("Entered Invalid email")
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if (!validator.isStrongPassword(value)) throw new Error("Enter Strong Password")
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value){
            if (value < 18){
                throw new Error("Not eligible for this platform")
            }
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "trans"]
    },
    photoUrl: {
        type: String, 
        default: "https://www.kindpng.com/picc/m/3-36825_and-art-default-profile-picture-png-transparent-png.png",
        validate(value){
            if (!validator.isURL(value)) throw new Error("Enter a valid URL")
        }
    },
    skills: {
        type: [String],
        required: true,
    },
    about:{
        type: String,
        default: "This is the about section for the user..."
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User;