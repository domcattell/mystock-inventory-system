
const express = require("express"),
bodyParser = require("body-parser"),
//routes
productRoutes = require("./routes/api/products")

//setup
app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = process.env.PORT || 5000;

//routes setup
app.use('/api/products/', productRoutes)

app.listen(port, () => {
    console.log("server started")
})





