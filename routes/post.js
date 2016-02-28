/**
 * Created by jeffchang on 2016-02-28.
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
        return require('highlight.js').highlighAuto(code).value;
    }
});

router.get('/create_post', function(req, res) {
    res.render('create_post');
});

router.get('/get_post/:post_id', function(req, res, next) {
    request({
        url:"http://"+req.get('host')+"/api/posts/"+req.params.post_id,
        method: 'GET'
    }, function(error, response, body){
        if(error){
            console.log(error);
        }else{
            console.log(response.body);
            var json = JSON.parse(response.body);
            res.render('post', {post:json, md:md });
        }
    })
});

router.post('/new_post', function(req, res) {
    // Build the json file
    var json = req.body;
    // TODO: Dont hardcode
    json.tags = ["Javascript", "BRUTAL ASSFUCKING XXXXX"];
    if(req.isAuthenticated()) {
        console.log("PRELIM USER:" + req.user);
        // Find the user details
        Model.User.findOne({
            where: { username : req.user }
        }).then(function(user) {
            console.log("USER: " + user.dataValues);
            // Get the user
            console.log("JSON SHIT: " + json);
            json.image_url = "placeholder";
            json.type = 0;
            console.log("USERDATA:" + user.dataValues);
            json.user_id = user.dataValues.id;
            console.log("Post begin!");
            request({
                uri: "http://" + req.get('host') + "/api/posts/new_post",
                method: "POST",
                json: json,
                header: {
                    "Content-Type": 'application/json'
                }
            }, function (error, response, body) {
                console.log(response);
                if (error) {
                    console.log("Error posting:" + error);
                    res.redirect('/');
                } else {
                    console.log("POST posted");
                    res.redirect('/');
                }
            });
        });
    }
});

module.exports = router;