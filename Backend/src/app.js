const express = require("express")
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")
const cors = require ("cors")
require("dotenv").config();


const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

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




