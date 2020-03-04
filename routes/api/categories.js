const express = require("express"),
    router = express.Router(),
    db = require("../../database"),
    auth = require("../../middleware/auth")

router.all('*', auth)

//get categories
router.get("/all", (req, res) => {
    const sql = "SELECT * FROM categories;";
    db.query(sql, (err, categories) => {
        if (err) res.json({ msg: `Database error occured: ${err}` });
        res.json(categories);
    });
});


router.post("/add", (req, res) => {
    const {category} = req.body
    const sql = `INSERT INTO categories (category) VALUES (?) `;
    db.query(sql,[category], (err, result) => {
        if(err) {
            if(err.errno = 1062) {
                res.status(400).json({ error: `${category} already exists as a category`})
                console.log(` ${category} category already exists`)
            } else {
                res.status(500).json({ error: "Database error occured" })
                console.log(err)
            };
        } else {
            const newCategory = {
                category: category,
                id: result.insertId
            };
            res.status(200).json(newCategory);
            console.log(newCategory);
        };
    });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params
    const sql = "DELETE FROM categories where id = ?";
    db.query(sql,[id], (err, result) => {
        if (err) res.json({ msg: `Database error occured: ${err}` });
        res.status(200).json({ success: "Category successfully deleted" });
        console.log(id)
    });
});

router.put("/:id", (req, res) => {
    const {category} = req.body;
    const {id} = req.params;
    const sql = `UPDATE categories SET categories.category = ? WHERE categories.id = ?`
    db.query(sql, [category, id], (err, result) => {
        if(err) {
            if(err.errno = 1062) {
                res.status(400).json({error: `${category} already exists as a category`})
            } else {
                res.status(500).json({error: "Database error occured"})
            }
        };
        const updatedCategory = {
            category: category,
            id: req.params.id
        };

        res.status(200).json({updatedCategory, success: "Category updated"});
    });
});

router.get("/:id/category_products", (req, res) => {
    const {id} = req.params;
    const sql = `SELECT products.product_name, products.qty, products.SKU, products.id, categories.category
                FROM products 
                INNER JOIN categories 
                ON products.category_id = categories.id 
                WHERE categories.id = ?`
    db.query(sql,[id], (err, categoryProducts) => {
        if(err) res.status(500).json({error: "Database error occured"});
        res.status(200).json(categoryProducts);
    })
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM categories WHERE id = ?`
    db.query(sql, [id], (err, category) => {
        if(err) res.status(500).json({error: "Database error occured"});
        res.status(200).json(category);
    })
})

module.exports = router