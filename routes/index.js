var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.get('host'));
  request({
    url:"http://"+req.get('host')+"/api/tags/top/4",
    method: 'GET'
  }, function(error, response, body){
    if(error){
      console.log(error);
    }else{
      console.log(response.body);
      var json = JSON.parse(response.body);
      console.log(req.isAuthenticated());
      res.render('index', { title: 'Shitpost', tags: json, loggedIn: req.isAuthenticated()});
    }
  })
});

module.exports = router;
