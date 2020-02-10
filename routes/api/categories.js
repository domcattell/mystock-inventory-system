const express = require("express"),
    router = express.Router(),
    db = require("../../database"),
    auth = require("../../middleware/auth")

router.all('*', auth)

//get categories
router.get("/all", (req, res) => {
    const sql = "SELECT * FROM categories;";
    db.query(sql, (err, categories) => {
        if (err) res.json({ msg: `Database error occured: ${err}` })
        res.json(categories)
    })
})

router.post("/add", (req, res) => {
    const { category } = req.body;
    const sqlValidation = "SELECT category FROM categories where category = ?";
    db.query(sqlValidation, [category], (error, result) => {
        if (!result.length) {
            const sqlAdd = "INSERT INTO categories (category) VALUES (?)"
            db.query(sqlAdd, (error, result) => {
                if (error) res.json({ msg: `Database error occured: ${error}` })
                const newCategory = {
                    category: category,
                    id: result.insertID
                }
                res.json({ newCategory })
            })
        } else if (category === result[0].category) {
            res.json({ msg: "Category already exists!" })
        }
    })
})

router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM categories where id = ?";
    db.query(sql, (err, result) => {
        if (err) res.json({ msg: `Database error occured: ${err}` })
        res.json({ msg: "Category deleted" })
    })
})

router.put("/:id", (req, res) => {
    const {category} = req.body
    const sqlValidation = "SELECT category FROM categories where category = ?";
    db.query(sqlValidation,[category], (err, result) => {
        if(!result.length) {
            const sqlUpdate = "UPDATE categories SET category = ?"
            db.query(sqlUpdate, (err, result) => {
                if (err) res.json({ msg: `Database error occured: ${err}` })
                const updatedCategory = {
                    category: category,
                    id: req.params.id
                }
                res.json({updatedCategory})
            })
        } else if (category === result[0].category) {
            json.msg({msg: "Category already exists!"})
        }
    })
})

module.exports = router