var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET transaction listing. */
router.get('/select', function (req, res, next) {
    db.select_transactions((rows) => {
        res.send(rows);
    });
});

/* POST new transaction */
router.post('/add', function (req, res, next) {
    db.insert_transaction(new Date(req.body.date), req.body.account_id, req.body.vendor, req.body.amount);
    res.send("added!");
});

module.exports = router;