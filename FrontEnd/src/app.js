const express = require("express")

// now making instance of express
const app = express()

// here is request handler

app.use("/test", (req, res) => {
    res.send("Hello from test")
})

app.use("/", (req, res) => {
    res.send("Hello from Server");
})


// now listen to the port 

app.listen(3000, () => {
    console.log("server is running on port 3000");
})