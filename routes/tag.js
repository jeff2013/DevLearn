/**
 <<<<<<< Updated upstream
 *
 * Created by jeff on 2/27/16.
 */

var express = require('express');
var passport = require('passport');
var Model = require('../models');
var router = express.Router();
var request = require('request');

router.get('/search/:query_string', function(req, res) {
    request({
        url: "http://" + req.get('host') + "/api/search/" + req.params.query_string,
        method: 'GET'
    }, function(error, response, body){
        if(error){
            console.log(error);
        }else{
            console.log(response.body);
            var json = JSON.parse(response.body);
            res.render('post_list', { title: 'Shitpost', posts: json});
        }
    })
});

router.get('/:tag_id/top_posts/:num_posts', function(req, res) {
    request({
        url:"http://"+req.get('host')+"/api/tags/"+req.params.tag_id+"/top_posts/"+req.params.num_posts,
        method: 'GET'
    }, function(error, response, body){
        if(error){
            console.log(error);
        }else{
            console.log(response.body);
            var json = JSON.parse(response.body);
            res.render('post_list', { title: 'Shitpost', posts: json});
        }
    })
});
module.exports = router;