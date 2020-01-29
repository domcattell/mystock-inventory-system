const express = require("express"),
router = express.Router(),
db = require("../../database")

//gets all items
router.get("/", (req, res) => {
    const sql = "SELECT * FROM mystock.products;";
    db.query(sql, (err, products) => {
        if(err) {
            console.log(err)
        } else {
            res.json(products)
        }
    })
})

module.exports = router