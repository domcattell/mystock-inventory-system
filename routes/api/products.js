const express = require("express"),
    router = express.Router(),
    db = require("../../database"),
    auth = require("../../middleware/auth");


router.all('*', auth);

//gets all products
router.get("/all", (req, res) => {
    const sql = `SELECT products.id, products.product_name, products.qty, products.SKU, products.created_at, categories.category 
                FROM products 
                INNER JOIN categories 
                ON products.category_id = categories.id;`
    db.query(sql, (err, products) => {
        if (err) res.status(500).json({ msg: { error: "Database error occured" } })
        else {
            res.json(products);
        };
    });
});

//get single product
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT products.id, products.product_name, products.qty, products.SKU, products.price, products.created_at, categories.category 
                FROM products JOIN categories ON products.category_id = categories.id 
                WHERE products.id = ?;`;
    db.query(sql, [id], (err, product) => {
        if (err)  res.status(500).json({ msg: { error: "Database error occured" } })
        else {
            if (product.length === 0) {
                res.status(404).json({ msg: { error: "404 - Product not found" } })
                console.log("hit me")
            } else
                res.status(200).json(product);
        };
    });
});

// add new product
router.post("/add", (req, res) => {
    const { name, qty, category, price } = req.body;
    generatedSku = `${name.toUpperCase()}-${category.toUpperCase()}`
    //generatedSKU creates a SKU based on the input values. 
    //Could also be done in SQL but satisfactory being here for now

    const sql = `INSERT INTO products (category_id, product_name, qty, SKU, price)
                SELECT categories.id, ?, ?, ?, ?
                FROM categories
                WHERE categories.category = ?;`
    db.query(sql, [name, qty, generatedSku, price, category], (err, result) => {
        if (err) {
            if (err.errno == 1062) {
                res.status(400).json({ msg: { error: `"${name}" already exists as a product` } });
            } else {
                res.status(500).json({ msg: { error: "Something went wrong" } });
                console.log(err)
            };
        } else {
            //another SELECT query could be added here to get the new product instead,
            //of creating another object and simply prefilling it with the req.body data
            const newProduct = {
                SKU: generatedSku,
                product_name: name,
                qty: qty,
                category: category,
                price: price,
                id: result.insertId
            };
            res.status(201).json({ newProduct, msg: { success: `${name} has been added as a product` } });
        };
    });
});

// delete a single product
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE id = ?`
    db.query(sql, [id], (err, result) => {
        if (err) res.status(500).json({ msg: { error: "Database error occured" } })
        else {
            res.status(200).json({ msg: { success: "Product deleted" } });
        };
    });
});

//update a single product
router.put("/:id", (req, res) => {
    const { sku, name, qty, category, price } = req.body;
    const { id } = req.params;
    const updateSQL = `UPDATE products SET  
                product_name = ?, 
                qty = ?, 
                price = ?,
                category_id = (SELECT categories.id FROM categories WHERE categories.category = ?)
                WHERE id = ?`
    db.query(updateSQL, [name, qty, price, category, id, id], (err, result) => {
        if (err) {
            if (err.errno == 1062) {
                res.status(400).json({ msg: { error: `"${name}" already exists as a product` } })
                console.log(`Error: ${name} already exists as a product`)
            } else {
                res.status(500).json({ msg: { error: "Something went wrong" } })
                console.log("database error")
            };
        } else {
            //another query is needed here to display the updated results and send them to the global state in React
            const selectSQL = `SELECT products.id, products.product_name, products.qty, products.SKU, products.price, products.created_at, categories.category 
                                FROM products JOIN categories ON products.category_id = categories.id 
                                WHERE products.id = ?`;
            db.query(selectSQL, [id], (err, updatedProduct) => {
                if (err) {
                    res.status(500).json({ msg: { error: "Something went wrong" } })
                    console.log(err)
                } else {
                    res.status(200).json({ updatedProduct, msg: { success: `Successfully updated ${name}` } })
                };
            });
        };
    });
});

module.exports = router;