var express = require('express');
var router = express.Router();

var db = require('../db');


router.post('/add', function (req, res, next) {
    var category = req.body.category_name
    db.insert_category(category);
    res.send("added!");
});

router.get('/select', function (req, res, next) {
    db.select_categories((rows) => {
        res.send(rows);
    });
});

module.exports = router;