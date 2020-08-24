var express = require("express");
var router = express.Router();

var db = require("../db");
const { translate_error } = require("../errors/handler");

/* 
    POST ROUTES 
*/
router.post("/add", function (req, res, next) {
  var category = req.body.category_name;
  db.insert_category(category, (err) => {
    if (err) {
      translate_error(err, res);
    }
    res.send("added!");
  });
});

router.post("/delete", function (req, res, next) {
  var category_id = req.body.category_id;
  db.delete_category(category_id, (err) => {
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
  db.select_categories((err, rows) => {
    if (err) {
      translate_error(err, res);
    }
    res.send(rows);
  });
});

module.exports = router;
