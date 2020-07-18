var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var jobs = require('./scheduler/cron')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var isProduction = process.env.NODE_ENV === 'production';
console.log("Env :", isProduction);


// Monggose
if(isProduction){
  // mongoose.connect(process.env.MONGODB_URI);
  
  mongoose.connect('mongodb+srv://admin:jN4H5rKLF573m0vT@cluster0.jdvdd.mongodb.net/stagin?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

} else {
  // const stage_uri = 'mongodb+srv://admin:#$%%mars@cluster0.jdvdd.mongodb.net/stagin?retryWrites=true&w=majority';

  // mongoose.connect(stage_uri, {
  //   useNewUrlParser: true
  // });

  mongoose.connect('mongodb+srv://admin:jN4H5rKLF573m0vT@cluster0.jdvdd.mongodb.net/stagin?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });


  // mongoose.connect('mongodb://localhost/conduit');
  mongoose.set('debug', true);
}

//Models
require('./models/User');


//One to many route
app.use(require('./routes'));

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

// Crons
// jobs.startCron();


module.exports = app;
