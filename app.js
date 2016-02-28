var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var login = require('./routes/login');
var user_api = require('./routes/user_api');
var tag_api = require('./routes/tag_api');
var post_api=require('./routes/post_api');
var register = require('./routes/register');
var tag = require('./routes/tag');
var posts=require('./routes/post');
var express = require('express');
var busboy = require('connect-busboy');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var models = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session') ({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(busboy());

app.use('/', routes);
app.use('/login', login);
app.use('/register', register);
app.use('/api/users', user_api);
app.use('/api/tags', tag_api);
app.use('/api/posts', post_api);
app.use('/tags', tag);
app.use('/posts', posts);

models.sequelize.sync().then(function () {
  console.log('Sequelize initialized!');
  startPassport();
});

passport.serializeUser(function (username, done) {
  done(null, username);
});
passport.deserializeUser(function (username, done) {
  var query = {
    "where": { "username": username },
    "attributes": ['username', 'password']
  };
  var deserialize = function (user) {
    var username = user.dataValues.username;
    done(null, username);
  };
  models.User.findOne(query).then(deserialize);
});



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



var startPassport = function(){
  passport.use(new LocalStrategy(function (username, password, done){
    var query = {
      "where": {"username": username},
      "attributes": ['username', 'password']
    };
    //use the else cases because done() is async ffs.
    var validate = function(user){
      if(user == null){
        done(null, false, {message: "User not found"});
      }else{
        var account = user.dataValues;
        if(!account) {
          done(null, false, {message: 'Unknown user'});
        }else{
          bcrypt.compare(password, account.password, function(err, res){
            if(res){
              done(null, account.username);
            }else{
              done(null, false, {message: "Invalid Password"});
            }
          });
        }
      }
    };
    models.User.findOne(query).then(validate);
  }));
}


module.exports = app;
