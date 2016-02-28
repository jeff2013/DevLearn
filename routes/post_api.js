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
    Model.Post.create({
        where: {
            title: body.title,
            type: body.type,
            content: body.content,
            popularity: 0,
            
        }
    })
});

module.exports = router;

