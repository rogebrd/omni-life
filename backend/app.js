var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const db = require('./db');

// Env Variables
const db_file = require('./utils/env').db_file;

// Namespace Routers
var indexRouter = require('./routes/index');
var transactionRouter = require('./routes/transactions');
var accountRouter = require('./routes/accounts');
var categoryRouter = require('./routes/categories');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Namespace Configurations
app.use('/', indexRouter);
app.use('/transactions', transactionRouter);
app.use('/accounts', accountRouter);
app.use('/categories', categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

// Setup DB based off env flag
console.log(process.env.SETUP_DB);
if (process.env.SETUP_DB !== 0) {
  console.log('Initializing DB');
  db.initialize_db(db_file);
}

module.exports = app;
