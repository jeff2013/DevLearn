var express = require('express');
var router = express.Router();
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
      console.log(response);
      //var json = JSON.parse(response);
      res.render('index', { title: 'Shitpost'});
    }
  })
});

module.exports = router;
