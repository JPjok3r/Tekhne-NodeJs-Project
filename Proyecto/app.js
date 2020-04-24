var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoContext = require('./mongo');

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pelisRouter = require('./routes/peliculas');
var seriesRouter = require('./routes/series');
var adminRouter = require('./routes/admin');
var pagosRouter = require('./routes/payment');

mongoContext.connect({
  uri: process.env.MONGO_URL || 'mongodb://localhost/starstreams',
  params: {
    connectTimeoutMS: 15000,
    useNewUrlParser: true
  }
}, function (error) {
  console.error(`MongoDB connection error: ${error}`);
  process.exit(-1);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/peliculas', pelisRouter);
app.use('/series', seriesRouter);
app.use('/admin', adminRouter);
app.use('/payment', pagosRouter);

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
