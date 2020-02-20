const express = require("express"),
    router = express.Router(),
    db = require("../../database"),
    auth = require("../../middleware/auth")


router.all('*', auth)

//gets all products
router.get("/all", (req, res) => {
    const sql = `SELECT products.id, products.product_name, products.qty, products.SKU, products.created_at, categories.category 
                FROM products 
                INNER JOIN categories 
                ON products.category_id = categories.id;`
    db.query(sql, (err, products) => {
        if (err) res.json({ msg: `Database error occured` })

        res.json(products)
    })
})

//get single product
router.get("/:id", (req, res) => {
    const sql = `SELECT products.id, products.product_name, products.qty, products.SKU, products.created_at, categories.category 
                FROM products JOIN categories ON products.category_id = categories.id 
                WHERE products.id = ${req.params.id};`;
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
    const sql = `INSERT INTO products (category_id, product_name, qty, SKU)
                SELECT categories.id, ?, ?, ?
                FROM categories
                WHERE categories.category = ?;`
    db.query(sql,[name, qty, sku, category], (err, result) => {
        if (err) {
            if(err.errno = 1062) {
                res.json({msg: `Error: "${name}" already exists as a product`})
                console.log(`Error: ${name} already exists as a product`)
            } else {
                res.json({msg: "Database error occured"})
            }
        } else {
            const newProduct = {
                SKU: sku,
                product_name: name,
                qty: qty,
                category: category,
                id: result.insertId
            }
            res.json(newProduct)
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
    const sql = `UPDATE products SET 
                SKU = ?, 
                product_name = ?, 
                qty = ?, 
                category_id = (SELECT categories.id FROM categories WHERE categories.category = ?)
                WHERE id = ?`
    // const sql = `UPDATE products SET SKU = "${sku}", product_name = "${name}", qty = "${qty}", category = "${category}" where id = ${req.params.id}`
    db.query(sql,[sku, name, qty, category, req.params.id], (err, result) => {
        if (err) {
            if(err.errno = 1062) {
                res.json({msg: `Error: "${name}" already exists as a product`})
                console.log(`Error: ${name} already exists as a product`)
            }
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