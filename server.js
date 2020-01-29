
const express = require("express"),
bodyParser = require("body-parser"),
//routes
indexRoutes = require("./routes/api/index")

//setup
app = express()
app.use(express.json());
const port = process.env.PORT || 5000;

//routes setup
app.use('/api/index', indexRoutes)

app.listen(port, () => {
    console.log("server started")
})





