const express = require("express"),
    mysql = require("mysql")

//DATABASE SETUP//
db = mysql.createConnection({
    host: "host",
    user: "user",
    password: "password",
    database: `database`
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to db");
    };
});
//DATABASE SETUP//

module.exports = db;