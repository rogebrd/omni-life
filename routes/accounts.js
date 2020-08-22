var express = require('express');
var router = express.Router();

var db = require('../db');


router.post('/add', function (req, res, next) {
    var account = req.body.account_name
    db.insert_account(account);
    res.send("added!");
});

router.get('/select', function (req, res, next) {
    db.select_accounts((rows) => {
        res.send(rows);
    });
});

module.exports = router;