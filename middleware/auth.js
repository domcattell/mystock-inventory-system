const jwt = require("jsonwebtoken")
const secret = "secret"

const auth = (req, res, next) => {
    const token = req.cookies.token

    if(!token) {
        console.log("NO TOKEN PROVIDED!")
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                res.status(401).send("ERROR")
                console.log("TOKEN ERROR")
            } else {
                req.username = decoded.username
                next();

            }
        })
    }
}

module.exports = auth