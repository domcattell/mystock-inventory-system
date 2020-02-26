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
        if (err) res.status(500).json({ error: "Database error occured" })
        res.json(products)
    })
})

//get single product
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const sql = `SELECT products.id, products.product_name, products.qty, products.SKU, products.price, products.created_at, categories.category 
                FROM products JOIN categories ON products.category_id = categories.id 
                WHERE products.id = ?;`;
    db.query(sql,[id], (err, product) => {
        if (err) res.status(500).json({ error: "Database error occured" })
        res.json(product)
    })
})

// add new product
router.post("/add", (req, res) => {
    const { sku, name, qty, category, price } = req.body;
    const sql = `INSERT INTO products (category_id, product_name, qty, SKU, price)
                SELECT categories.id, ?, ?, ?, ?
                FROM categories
                WHERE categories.category = ?;`
    db.query(sql,[name, qty, sku, price, category], (err, result) => {
        if (err) {
            if(err.errno = 1062) {
                console.log(`Error: ${name} already exists as a product`)
                res.status(400).json({ error: `"${name}" already exists as a product` })
            } else {
                res.status(500).json({ error: "Database error occured" })
            }
        } else {
            const newProduct = {
                SKU: sku,
                product_name: name,
                qty: qty,
                category: category,
                price: price,
                id: result.insertId
            };
            res.status(201);
            res.json(newProduct);
        }
    });
});

// delete a single product
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM products WHERE id = ?`
    db.query(sql, [id], (err, result) => {
        if (err) res.status(500).json({ error: "Database error occured" })
        res.status(200).json({ success: "Product deleted" })
    })
})

//update a single product
router.put("/:id", (req, res) => {
    const { sku, name, qty, category, price } = req.body
    const sql = `UPDATE products SET 
                SKU = ?, 
                product_name = ?, 
                qty = ?, 
                price = ?,
                category_id = (SELECT categories.id FROM categories WHERE categories.category = ?)
                WHERE id = ?`
    db.query(sql,[sku, name, qty, price, category, req.params.id], (err, result) => {
        if (err) {
            if(err.errno = 1062) {
                res.status(400).json({ error: `"${name}" already exists as a product` })
                console.log(`Error: ${name} already exists as a product`)
            }
            res.status(400)
            console.log("database error")
        } else {
            const updatedProduct = {
                SKU: sku,
                product_name: name,
                qty: qty,
                category: category,
                price: price,
                id: req.params.id
            }

            res.status(200).json({updatedProduct, success:"Updated product"})
        }
    })
})

module.exports = router