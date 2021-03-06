const express = require("express"),
    router = express.Router(),
    db = require("../../database"),
    bcrpyt = require("bcrypt-nodejs"),
    jwt = require("jsonwebtoken"),
    auth = require("../../middleware/auth");

//webtoken secret. Really shouldn't just be "secret"
const secret = "secret";

//register user using bcrypt to encrypt the password
router.post("/register", (req, res) => {
    let {username, password} = req.body;

    //use bcrypt to encrypt user password field
    bcrpyt.hash(password, bcrpyt.genSaltSync(10), null, (err, hash) => {
        if (err) console.log(err) 
        else {
            password = hash;
            const sql = `INSERT INTO users (user_name, user_password) VALUES (?, ?);`
            db.query(sql, [username.toLowerCase(), password], (error, result) => {
                if(error) {
                    //checks mysql error code and sends back appropriate message back to the client
                    if (error.errno == 1062) {
                        console.log("Username already taken");
                        res.status(401).json({ msg: {error: "Username already taken" }});
                    }
                    else if (error.errno == 1406) {
                        res.status(401).json({ msg: {error: "Username too long. Max 25 characters"} });
                    } else {
                        res.status(500).send({ msg: {error: "Database error occured!"} });
                    }
                } 
                res.status(200).json({msg: {created: true}});
                console.log(result) ;
            });
        };
    });
});

// checks if user already exists. sends request on state change (useEffect) in react to dynamically tell user if the username is available
router.post("/register/validation", async (req, res) => {
    let { username } = req.body;
    const sql = "SELECT user_name FROM users WHERE user_name = ?";
    await db.query(sql, [username], (error, result) => {
        if (error) res.status(500).send({ msg: {error: "Database error occured!"} });
        else {
            if (!result.length) {
                res.status(200).json({ msg: {userTaken: false}});
            } else if (username.toLowerCase() === result[0].user_name) {
                res.status(200).json({ msg: {userTaken: true} }); 
            };
        };
    });
});

//login
router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE user_name = ?`
    db.query(sql, [username.toLowerCase()], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Database error has occured!" });
        } else {
            if (!result.length) {
                console.log("wrong username or password");
                res.status(401).json({ msg: {error: "Wrong username or password"} });
            } else {
                //compare password user typed in with encrypted password saved on DB
                bcrpyt.compare(password, result[0].user_password, (err, result) => {
                    if (result == true) {
                        const payload = { username };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '60m'
                        });
                        res.status(200).json({token});
                    } else {
                        console.log("wrong username or password")
                        res.status(401).json({ msg: {error: "Wrong username or password"} });
                    };
                });
            };
        };
    });
});


//auth route. also gets username
router.get("/auth", auth, (req, res) => {
    const sql = `SELECT * FROM users WHERE user_name = ?;`
    db.query(sql, [req.username], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ msg: {error: "Database error has occured!"} });
        } else {
            const currentUser = result[0].user_name;
            res.status(200).json({currentUser});
        };
    });
});

module.exports = router;