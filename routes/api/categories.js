const express = require("express"),
    router = express.Router(),
    db = require("../../database"),
    auth = require("../../middleware/auth");

router.all('*', auth);

//get categories
router.get("/all", (req, res) => {
    const sql = "SELECT * FROM categories;";
    db.query(sql, (err, categories) => {
        if (err) res.json({ msg: {error: `Database error occured`} })
        else {
            res.json(categories);
        };
    });
});

//add new category
router.post("/add", (req, res) => {
    const {category} = req.body
    const sql = `INSERT INTO categories (category) VALUES (?) `;
    db.query(sql,[category], (err, result) => {
        if(err) {
            if(err.errno = 1062) {
                res.status(400).json({ msg:{ error: `${category} already exists as a category`}})
            } else {
                res.status(500).json({ msg: {error: "Database error occured"} })
            };
        } else {
            const newCategory = {
                category: category,
                id: result.insertId
            };
            res.status(200).json({newCategory, msg: {success: `Successfully added ${category} as a category`}});
        };
    });
});

//delete existing category
router.delete("/:id", (req, res) => {
    const {id} = req.params
    const sql = "DELETE FROM categories where id = ?";
    db.query(sql,[id], (err, result) => {
        if (err) res.json({ msg: {error: `Database error occured: ${err}`} })
        else {
            res.status(200).json({ msg: {success: "Category successfully deleted"}});
        };
    });
});

//update existing category
router.put("/:id", (req, res) => {
    const {category} = req.body;
    const {id} = req.params;
    const sql = `UPDATE categories SET categories.category = ? WHERE categories.id = ?`
    db.query(sql, [category, id], (err, result) => {
        if(err) {
            if(err.errno = 1062) {
                res.status(400).json({ msg: {error: `${category} already exists as a category`}});
            } else {
                res.status(500).json({ msg: {error: "Database error occured"} });
            };
        } else {
            const updatedCategory = {
                category: category,
                id: req.params.id 
            };
            res.status(200).json({updatedCategory, msg: {success: `Successfully updated ${category}`}});
        };
    });
});

//gets list of products where the id param is the categories id in the db
router.get("/:id/category_products", (req, res) => {
    const {id} = req.params;
    const sql = `SELECT products.product_name, products.qty, products.SKU, products.id, categories.category
                FROM products 
                INNER JOIN categories 
                ON products.category_id = categories.id 
                WHERE categories.id = ?`
    db.query(sql,[id], (err, categoryProducts) => {
        if(err) res.status(500).json({msg: {error: "Database error occured"}}) 
        else {
            res.status(200).json(categoryProducts);
        };
    });
});

//get individual category
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM categories WHERE id = ?`
    db.query(sql, [id], (err, category) => {
        if(err) res.status(500).json({msg: {error: "Database error occured"}})
        else {
            if(category.length === 0) {
                res.status(404).json({msg: {error: "Category not found"}})
            } else {
                res.status(200).json(category);
            }
        };
    });
});

module.exports = router;