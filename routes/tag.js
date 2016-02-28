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
var md = require('marked');

// Code highlighting because why not lol
md.setOptions({
    highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

router.get('/:tag_id/top_posts/:num_posts', function(req, res) {
    request({
        url:"http://"+req.get('host')+"/api/tags/"+req.params.tag_id+"/top_posts/"+req.params.num_posts,
        method: 'GET'
    }, function(error, response, body){
        if(error){
            console.log(error);
        }else{
            console.log("BODY" + response.body);
            var json = JSON.parse(response.body);
            Model.Tag.findOne({where : {id : req.params.tag_id}}).then(function(tag) {
                res.render('post_list', { title: tag.title, posts: json, md:md});
            })
        }
    })
});
module.exports = router;