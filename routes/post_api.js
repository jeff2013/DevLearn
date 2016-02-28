/**
 * Created by reed on 2/27/16.
 */
var Model = require("../models");
var express = require("express");
var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/:post_id', function (req, res) {
    Model.Course.findOne({
        where: {
            post_id: req.params.post_id
        }
    }).then(function(course) {
        res.json(course.dataValues);
    })
});

router.post('/new_post', function(req, res) {
    var body = req.body;
    if(req.isAuthenticated()) {
        // Find the user details
        Model.User.findOne({
            where: { username: req.user.username}
        }).then(function(user) {
           return user.addPost({
               where: {
                   title: body.title,
                   type: body.type,
                   content: body.content,
                   popularity: 0,
                   image_url: body.image_url
               }
           })
        }).then(function(post) {
            return Promise.all([Promise.resolve(post)]
                .concat(
                    body.tags.map(function (tag) {
                        return Model.Tag.findOrCreate({
                            where: {
                                title: tag
                            }
                        })
                    })
                )
            )
        }).then(function(tags) {
            var post = tags.unshift()
            return post.setTags(tags)
        }).then(function(){
            res.json({ result: post.dataValue })
        }).catch(function(err){
            console.error(err);
            res.status(500).end();
        });
    } else {
        res.status('403').end();
    }
});

module.exports = router;

