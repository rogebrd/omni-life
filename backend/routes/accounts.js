var express = require("express");
var router = express.Router();

var db = require("../db");
const { translate_error } = require("../errors/handler");

/* 
    POST ROUTES 
*/
router.post("/add", function (req, res, next) {
  var account = req.body.account_name;
  var type = req.body.account_type;
  db.insert_account(account, type, (err) => {
    if (err) {
      translate_error(err, res);
    } else {
      res.send("added!");
    }
  });
});

router.post("/delete", function (req, res, next) {
  var account_id = req.body.account_id;
  db.delete_account(account_id, (err) => {
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
  db.select_accounts((err, rows) => {
    if (err) {
      translate_error(err, res);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
