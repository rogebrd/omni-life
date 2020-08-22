var express = require('express');
var router = express.Router();

var db = require('../db');
const { translate_error } = require('../errors/handler');

router.post('/add', function (req, res, next) {
    db.insert_transaction(new Date(req.body.date), req.body.account_id, req.body.category_id, req.body.vendor, req.body.amount, (err) => translate_error(err, res));
    res.send("added!");
});

router.get('/select', function (req, res, next) {
    db.select_transactions((rows) => {
        res.send(rows);
    }, (err) => translate_error(err, res));
});

module.exports = router;