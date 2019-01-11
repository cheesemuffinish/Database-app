var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ---------------------------------------------------------------------------//
// Tedious Database connection
// ---------------------------------------------------------------------------//
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
  userName: 'admin',
  password: 'password',
  server: 'localhost',
  port: 1433,
  options: {
    instanceName: 'MSSQLSERVER',
    database: 'Reporting_developer'
  }
}

var connection = new Connection(config);

connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connection Successful...\n");
  }
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Form posting routes
var reportRequestRouter = require('./routes/reportRequest');
var pendingReviewRouter = require('./routes/pendingReview');
var assignedInputRouter = require('./routes/assignedInput');
var pendingDevelopmentRouter = require('./routes/pendingDevelopment');
var developmentRouter = require('./routes/development');
var peerReviewRouter = require('./routes/peerReview');
var businessReviewRouter = require('./routes/businessReview');
var updateStatusRouter = require('./routes/updateStatus');
var requestReviewRouter = require('./routes/requestReview');
var noteRouter = require('./routes/note');
var levelOfEffortRouter = require('./routes/levelOfEffort');
var developerInputRouter = require('./routes/developerInput');
var configurationRouter = require('./routes/configuration');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Form posting use endpoints
app.use('/reportRequest', reportRequestRouter);
app.use('/pendingReview', pendingReviewRouter);
app.use('/assignedInput', assignedInputRouter);
app.use('/pendingDevelopment', pendingDevelopmentRouter);
app.use('/development', developmentRouter);
app.use('/peerReview', peerReviewRouter);
app.use('/businessReview', businessReviewRouter);
app.use('/updateStatus', updateStatusRouter);
app.use('/requestReview', requestReviewRouter);
app.use('/note', noteRouter);
app.use('/levelOfEffort', levelOfEffortRouter);
app.use('/developerInput', developerInputRouter);
app.use('/configuration', configurationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
