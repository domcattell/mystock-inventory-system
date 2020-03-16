const express = require("express"),
//routes
productRoutes = require("./routes/api/products"),
authRoutes = require("./routes/api/auth")
categoryRoutes = require("./routes/api/categories"),
//
path = require('path');

//setup
app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const port = process.env.PORT || 5000;

//routes setup
app.use('/api/', authRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/products/categories', categoryRoutes);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} 

app.listen(port, () => {
    console.log("server started")
});





