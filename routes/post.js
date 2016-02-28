/**
 * Created by jeffchang on 2016-02-28.
 */
var express = require('express');
var passport = require('passport');
var Model = require('../models');
var router = express.Router();
var request = require('request');
router.get('/:post_id', function(req, res, next) {
    request({
        url:"http://"+req.get('host')+"/api/posts/"+req.params.post_id,
        method: 'GET'
    }, function(error, response, body){
        if(error){
            console.log(error);
        }else{
            console.log(response.body);
            var json = JSON.parse(response.body);
            res.render('post', {post:json});
        }
    })
});

module.exports = router;