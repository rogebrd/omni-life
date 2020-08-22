var express = require('express');
var router = express.Router();

var db = require('../db');
const { translate_error } = require('../errors/handler');

router.post('/add', function (req, res, next) {
    var category = req.body.category_name
    db.insert_category(category, (err) => translate_error(err, res));
    res.send("added!");
});

router.get('/select', function (req, res, next) {
    db.select_categories((rows) => {
        res.send(rows);
    }), (err) => translate_error(err, res);
});

module.exports = router;