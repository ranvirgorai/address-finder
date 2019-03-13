var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const authenticate = expressJwt({ secret: 'MYSECRET' });
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

// configuration ===============================================================
// connect to our database

//setting up database
/*var Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/meanStack');
*/

// Getting System Ip
var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function(ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function(iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});
/*var db = Mongoose.createConnection('127.0.0.1', 'meanStack');
console.log(db);

// New Code
var ip='192.168.43.113';
var mongo = require('mongodb');
var monk  require('monk');
var db=monk(ip+'meanStack');
var mongoose=require('mongoose');
mongoose.connect('mongodb://ip/meanStack');
var MongoClient = require('mongodb').MongoClient;
*/
/*MongoClient.connect('mongodb://localhost/meanStack', function(err, db) {
  if (err) {
    throw err;
  }
  db.collection().find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
});*/

var db = require('./Backend/models/db');
var appMount = './Backend/routes';
//routes
var routes = require(appMount);
var address = require(appMount + '/address');
//console.log("media",mediaupload);
//console.log("log",log);
var app = express();

// required for passport
app.use(
  session({
    secret: 'Test',
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
//require("./routes/v1/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// view engine setup
app.set('views', path.join(__dirname, 'Backend/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: 'MYSECRET' }));
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/libs', express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'FrontEnd')));
// assing routes
app.use('/', routes);
app.use('/api/address', address);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
