var express = require('express');
var router = express.Router();

var db = require('../db');
const { translate_error } = require('../errors/handler');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/close', function (req, res, next) {
  db.close((err) => translate_error(err, res));
  res.send("close success");
});

module.exports = router;
