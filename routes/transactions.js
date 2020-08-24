var express = require("express");
var router = express.Router();

var db = require("../db");
const { translate_error } = require("../errors/handler");

/* 
    POST ROUTES 
*/
router.post("/add", function (req, res, next) {
  db.insert_transaction(
    new Date(req.body.date),
    req.body.account_id,
    req.body.category_id,
    req.body.vendor,
    req.body.amount,
    (err) => {
      if (err) {
        translate_error(err, res);
      }
      res.send("added!");
    }
  );
});

router.post("/delete", function (req, res, next) {
  var transaction_id = req.body.transaction_id;
  db.delete_transaction(transaction_id, (err) => {
    if (err) {
      translate_error(err, res);
    }
    res.send("removed");
  });
});

/*
    GET ROUTES
*/
router.get("/select", function (req, res, next) {
  db.select_transactions((err, rows) => {
    if (err) {
      translate_error(err, res);
    }
    results = rows.map((row) => {
      return new Transaction(
        row.id,
        row.date,
        row.accountId,
        row.categoryId,
        row.vendor,
        row.amount
      );
    });
    res.send(results);
  });
});

module.exports = router;
