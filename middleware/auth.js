const jwt = require("jsonwebtoken");
const secret = "secret";

//checks if a token is present. if not, send a 401, else verify if
// the token is valid, if not, send 403, otherwise continues with request
const auth = (req, res, next) => {
    // const token = req.cookies.token
    const token = req.header('x-auth-token');

    if(!token) {
        res.status(401).json({msg: {info: "No token. Please login"}});
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                res.status(403).json({msg: {error: "Session expired. Login to continue"}});
            } else {
                req.username = decoded.username;
                // res.status(200)
                next(); 
            };
        });
    };
};

module.exports = auth; 