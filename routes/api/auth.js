const express = require("express"),
    router = express.Router(),
    db = require("../../database"),
    bcrpyt = require("bcrypt-nodejs"),
    jwt = require("jsonwebtoken"),
    auth = require("../../middleware/auth")


const secret = "secret"

router.post("/register", (req, res) => {
    let { username, password } = req.body;
    bcrpyt.hash(password, bcrpyt.genSaltSync(10), null, (err, hash) => {
        if (err) console.log(err)
        const sql = `SELECT user_name FROM users WHERE user_name = ?`;
        db.query(sql,[username], (error, result) => {
            if (error) console.log(error)
            if(!result.length) {
                password = hash;
                const sql = `INSERT INTO users (user_name, user_password) VALUES (?, ?);`;
                db.query(sql, [username, password], (error, result) => {
                    if (error) res.status(400).json({ msg: "Error connecting to the database" })
                    console.log(result)
                })
            } else if (username === result[0].user_name) {
                res.json({msg: "Username already exists"})
            } 
        })
    })
})

router.post("/register/validation", async (req, res) => {
    let { username } = req.body;
    const sql = "SELECT user_name FROM users WHERE user_name = ?";
    await db.query(sql, [username], (error, result) => {
        if (error) console.log(error)

        if (!result.length) {
            res.json({ msg: "USERNAME AVAILABLE" })
        } else if (username === result[0].user_name) {
            res.json({ msg: "USERNAME TAKEN" })
        }
    })
})

router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE user_name = ?`
    db.query(sql, [username], (error, result) => {
        if (error) {
            console.log("ERROR!")
            console.log(error)
            res.status(400).json({ msg: "Error connecting to the database" })
        } else {
            if (!result.length) {
                console.log("wrong username or password")
                res.json({ msg: "Wrong username or password" })
            } else {
                bcrpyt.compare(password, result[0].user_password, (err, result) => {
                    if (result == true) {
                        const payload = { username }
                        const token = jwt.sign(payload, secret, {
                            expiresIn: 36000
                        })
                        res.json({ token })
                        console.log("LOGGED IN")
                    } else {
                        console.log("wrong password")
                        res.json({ msg: "Wrong username or password" })
                    }
                })
            }
        }
    })
})

router.get("/auth", auth, (req, res) => {
    const sql = `SELECT * FROM users WHERE user_name = ?;`
    db.query(sql, [req.username], (error, result) => {
        if (error) {
            console.log(err)
        }
        const currentUser = result[0].user_name
        res.json({ currentUser })
    })
})

module.exports = router