const express = require("express"),
router = express.Router(),
db = require("../../database")

//gets all products
router.get("/all", (req, res) => {
    const sql = "SELECT * FROM mystock.products;";
    db.query(sql, (err, products) => {
        if(err) {
            console.log(err)
        } else {
            res.json(products)
        }
    })
})

//get single product
router.get("/:id", (req, res) => {
    const sql = `SELECT * FROM products WHERE FIND_IN_SET('${req.params.id}', id);`;
    db.query(sql, (err, product) => {
        if(err) {
            console.log(err)
        } else {
            res.json(product)
        }
    })
})

//add new product
router.post("/add", (req, res) => {
    console.log("hit")
    const sql = `INSERT INTO products (SKU,product_name,qty,category) VALUES (${req.body.sku},'${req.body.name}', ${req.body.qty}, '${req.body.category}');`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    });
});

router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM products WHERE id = ${req.params.id};`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

router.put("/:id", (req, res) => {
    const sql = `UPDATE products SET SKU = "${req.body.sku}", product_name = "${req.body.name}", qty = "${req.body.qty}", category = "${req.body.category}" where id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

module.exports = router

// UPDATE products SET SKU = "1", product_name = "Shoes", qty = "10", category = "Shoes" where id = "42"