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
      } else {
        res.send("added!");
      }
    }
  );
});

router.post("/delete", function (req, res, next) {
  var transaction_id = req.body.transaction_id;
  db.delete_transaction(transaction_id, (err) => {
    if (err) {
      translate_error(err, res);
    } else {
      res.send("removed");
    }
  });
});

/*
    GET ROUTES
*/
router.get("/select", function (req, res, next) {
  db.select_transactions((err, rows) => {
    if (err) {
      translate_error(err, res);
    } else {
      results = rows.map((row) => {
        return new Transaction(
          row.id,
          row.date,
          row.account_id,
          row.category_id,
          row.vendor,
          row.amount
        );
      });
      res.json(results);
    }
  });
});

class Transaction {
  constructor(id, date, account_id, category_id, vendor, amount) {
    this.id = id;
    this.date = date;
    this.account_id = account_id;
    this.category_id = category_id;
    this.vendor = vendor;
    this.amount = amount;
  }
}

module.exports = router;
