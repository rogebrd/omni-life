var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function (req, res, next) {
  db.insert();
  res.send("added!");
});

router.get('/select', function (req, res, next) {
  var results = db.select((rows) => {
    res.send(rows);
  });
});

router.get('/close', function (req, res, next) {
  db.close();
  res.send("close success");
});

module.exports = router;
