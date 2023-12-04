/* Installed 3rd Party Packages */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let app = express();
// create a user model
let userModel = require('../models/user');
let User = userModel.User;

let mongoose = require('mongoose');
let DB = require('./db');

mongoose.connect(DB.URI);
let mongoDB = mongoose.connection; // Fix: changed 'mongDB' to 'mongoDB'
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('Connected to the MongoDB');
});

// Set-up Express Session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// Implement user authentication
passport.use(new localStrategy(User.authenticate())); // Fix: changed 'passport.use(User.createStrategy());' to 'passport.use(new localStrategy(User.authenticate()));'

// Serialize and deserialize user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize flash
app.use(flash());

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let tvRouter = require('../routes/tv');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tvlist', tvRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
