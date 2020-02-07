
const express = require("express"),
bodyParser = require("body-parser"),
passport = require("passport"),
LocalStrategy = require("passport-local").Strategy,
bcrpyt = require("bcrypt-nodejs"),
db = require("./database"),
jwt = require("jsonwebtoken"),
cookieParser = require('cookie-parser')
auth = require("./middleware/auth")

//routes
productRoutes = require("./routes/api/products")

//setup
app = express()
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser())

const port = process.env.PORT || 5000;

const secret = "secret"

app.post("/api/register", (req, res) => {
    let {username, password} = req.body;
    bcrpyt.hash(password, bcrpyt.genSaltSync(10), null, (err, hash) => {
        if(err) console.log(err)
        //ADD CHECK FOR EXISTING USER LOGIN

        password = hash;
        const sql = `INSERT INTO users (user_name, user_password) VALUES ('${username}', '${password}');`;
        db.query(sql, (error, result) => {
            if(error) console.log(error)
            console.log("worked")
        })

    })
})


app.post("/api/login", async (req, res) => {
    let {username, password} = req.body;
    const sql = `SELECT * FROM users WHERE user_name = '${username}';`
    db.query(sql, (error, result) => {
        if(error) {
            console.log("ERROR!")
            console.log(error)
            res.send({"code": 400, "failed": "error occured"})
            res.status(400).json({msg: "Error"})
        } else {
            if(!result.length) {
                console.log("wrong username or password")
            } else {
                bcrpyt.compare(password, result[0].user_password, (err, result) => {
                    if (result == true) {
                        const payload = {username}
                        const token = jwt.sign(payload, secret, {
                            expiresIn: 3600
                        })
                        res.cookie('token', token, {httpOnly: true})
                        console.log("LOGGED IN")
                        res.json({msg: "it works"})
                    } else {
                        console.log("wrong password")
                        res.json({msg: "wrong username or password"})
                    }
                })
            }
        } 
    })
})

// bcrpyt.compare(password, result[0].user_password, (err, bResult) => {
//     if (bResult == true) {
//         const payload = {username}
//         const token = jwt.sign(payload, secret, {
//             expiresIn: 3600
//         })
//         res.cookie('token', token, {httpOnly: true})
//         console.log("LOGGED IN")
//         res.json({msg: "it works"})
//     } else if (!result[0].user_name) {
//          console.log("wrong username") 
//     } else {
//      console.log(err)
//      console.log("wrong username or password")
//      res.json({msg: "wrong username or password"})
//  }
// })


app.get("/checktoken", auth, (req, res) => {
    res.sendStatus(200)
})
//routes setup
app.use('/api/products/', productRoutes)

app.listen(port, () => {
    console.log("server started")
})





