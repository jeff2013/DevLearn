/**
 * Created by reed on 2016-02-27.
 */
var Models = require("../models");
var express = require("express");
var bcrypt = require("bcryptjs");
var express = require('express');
var passport = require('passport');
var router = express.Router();
var http = require('http');

router.post('/new_user', function(req, res){
    console.log("POST recieved");
    console.log(req.body);
    // Validation logic here
    var body = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(body.password, salt);
    Model.User.findOrCreate({
        where: {
            'username': req.params.username,
        },
        defaults: {
            'password': hash,
            'email': req.params.email
        }
    }).then(function(user, created) {
        if(created) {
            res.json({'result': user.dataValues});
        } else {
            res.json({ 'result' : "User already exists"});
        }
    });
});

router.get('/:user_id', function(req, res) {
   Models.User.findOne({
       where: {
           user_id: req.params.user_id
       }
   }).then(function(user) {
       res.json(user.dataValues);
   })
});

router.get('/:user_id/courses', function (req, res) {
    Models.Course.find({
        include:[{'model': Models.User,
        where: {'user_id': req.paras.user_id}}]
    }).then(function (courses) {
        res.json(courses.dataValues);
    });
});

router.get('/:user_id/posts', function (req, res) {
    Models.Post.find({
        include:[{'model': Models.User,
            where: {'user_id': req.paras.user_id}}]
    }).then(function (posts) {
        res.json(posts.dataValues);
    });
});

module.exports = router;

