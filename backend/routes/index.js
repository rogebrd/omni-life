var express = require('express');
var router = express.Router();

var db = require('../db');
const { translate_error } = require('../errors/handler');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Homepage');
});

router.get('/summary', function (req, res, next) {
  db.select_accounts((err, rows) => {
    if (err) {
      translate_error(err, res);
    } else {
      account_result = `Accounts: ${JSON.stringify(rows)} `;
      db.select_categories((err, rows) => {
        if (err) {
          translate_error(err, res);
        } else {
          category_result = `Categories: ${JSON.stringify(rows)} `;
          db.select_transactions((err, rows) => {
            if (err) {
              translate_error(err, res);
            } else {
              transaction_result = `Transactions: ${JSON.stringify(rows)} `;
              res.send(account_result + category_result + transaction_result);
            }
          });
        }
      });
    }
  });
});

router.get('/close', function (req, res, next) {
  db.close((err) => {
    if (err) {
      translate_error(err, res);
    } else {
      res.send('close success');
    }
  });
});

module.exports = router;
