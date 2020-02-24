const jwt = require("jsonwebtoken")
const secret = "secret"

const auth = (req, res, next) => {
    // const token = req.cookies.token
    const token = req.header('x-auth-token')

    if(!token) {
        res.status(401).json({ error: "Error logging in!" });
        console.log("NO TOKEN PROVIDED!")
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                res.status(403).json({ error: "Session expired" });
                console.log("TOKEN ERROR")
            } else {
                req.username = decoded.username
                res.status(200)
                next();
            }
        })
    }
}

module.exports = auth