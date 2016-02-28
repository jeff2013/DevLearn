/**
 * Created by reed on 2016-02-27.
 */
var Model = require("../models");
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
    var account = {
        username: body.username,
        password: hash,
        email: body.email
    };
    var result = Model.User.create(account);
    res.json({ "result" : result.dataValues })
});

router.get('/:user_id', function(req, res) {
   Models.Comic.findOne({
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

