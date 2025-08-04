const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")

const app = express()
app.use(express.json())

// now making api for data entry into databse
app.post("/signup", async (req, res) => {
    const dummyUser = new User(req.body)
    try {
        await dummyUser.save();
        res.send("User saved successfully...")
    } catch (error) {
        res.status(400).send("User not saved!!!"+ error.message);
    }
})

app.get("/user", async(req, res) => {
    const emailId = req.body.email;
    
    const user = await User.find({email : emailId});

    try {
        res.status(200).send(user);
    } catch (err) {
        console.log("Something went wrong!!!")
    }
})

app.get("/feed", async(req, res) => {
    const users = await User.find({})

    try {
        res.send(users);
    } catch (error) {
        res.status(400).send("Something went wrong!!!");
    }
})

// api to delete the user 
app.delete("/user", async(req, res) => {
    const userId = req.body.id;
    const del = await User.findOneAndDelete({_id : userId})

    try {
        res.send("User deleted Successfully...")
    } catch (error) {
        res.status(400).send("Something went wrong while deleting the use!!!")
    }
})

app.patch("/user/:userId", async(req, res) => {
    const userId = req.params?.userId;
    const field = req.body;
    const ALLOWED_FIELDS = [
        "password", "photoUrl", "about", "skills"
    ]
    
    const isAllowed = Object.keys(field).every((keyitem) => ALLOWED_FIELDS.includes(keyitem))

    const updateUser = await User.findByIdAndUpdate(userId, field);
    try {
        // here implementing some more checks for safety of database
        if (!isAllowed){
            throw new Error("Update is not allowed for given field")
        }

        if (field.skills.length > 20) throw new Error("skills can't be more than 20")
            
        res.send("User updated successfully...")
    } catch (error) {
        res.status(400).send("Something went wrong while updating the user!!!")
    }
})

connectDB()
    .then(() => {
        console.log("database connected successfully...");
        app.listen(3000, ()=>{
            console.log("Server is running on PORT 3000")
        })
    })
    .catch((err) => {
        console.log("connection to database failed!!!")
    })




