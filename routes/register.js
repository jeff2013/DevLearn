/**
 * Created by jeffchang on 2016-02-27.
 */
var Model = require("../model");
var express = require("express");
var bcrypt = require("bcryptjs");
var express = require('express');
var passport = require('passport');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/');
        return;
    }
    res.render('register');
});

router.post('/', function(req, res){
    var body = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(body.password, salt);
    var account = {
        username: body.username,
        password: hash,
        email: body.email
    };
    Model.User.create(account);
    res.redirect('/');
});
module.exports = router;
