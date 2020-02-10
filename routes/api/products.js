const express = require("express"),
    router = express.Router(),
    db = require("../../database"),
    auth = require("../../middleware/auth")


router.all('*', auth)

//gets all products
router.get("/all", (req, res) => {
    const sql = "SELECT * FROM mystock.products;";
    db.query(sql, (err, products) => {
        if (err) res.json({ msg: `Database error occured: ${err}` })

        res.json(products)
    })
})

//get single product
router.get("/:id", (req, res) => {
    const sql = `SELECT * FROM products WHERE FIND_IN_SET('${req.params.id}', id);`;
    db.query(sql, (err, product) => {
        if (err) {
            console.log(err)
        } else {
            res.json(product)
        }
    })
})

// add new product
router.post("/add", (req, res) => {
    const { sku, name, qty, category } = req.body;
    const sql = `INSERT INTO products (SKU,product_name,qty,category) VALUES (${sku},'${name}', ${qty}, '${category}');`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const newProduct = {
                SKU: sku,
                product_name: name,
                qty: qty,
                category: category,
                id: result.insertId
            }
            res.json(newProduct)
            console.log(result.rows)
        }
    });
});

// delete a single product
router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM products WHERE id = ?`
    db.query(sql, [req.params.id], (err, result) => {
        if (err) res.json({ msg: `Database error occured: ${err}` })
        res.json({ msg: "Product deleted" })
    })
})

//update a single product
router.put("/:id", (req, res) => {
    const { sku, name, qty, category } = req.body
    const sql = `UPDATE products SET SKU = "${sku}", product_name = "${name}", qty = "${qty}", category = "${category}" where id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const updatedProduct = {
                SKU: sku,
                product_name: name,
                qty: qty,
                category: category,
                id: req.params.id
            }

            res.json(updatedProduct)
        }
    })
})

module.exports = router