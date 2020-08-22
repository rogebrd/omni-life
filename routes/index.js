var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/close', function (req, res, next) {
  db.close();
  res.send("close success");
});

module.exports = router;
