
const express = require("express"),

//routes
productRoutes = require("./routes/api/products"),
authRoutes = require("./routes/api/auth")

//setup
app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


const port = process.env.PORT || 5000;

//routes setup
app.use('/api/products/', productRoutes)
app.use('/api/', authRoutes)

app.listen(port, () => {
    console.log("server started")
})





