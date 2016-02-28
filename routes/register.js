/**
 * Created by jeffchang on 2016-02-27.
 */
var express = require("express");
var querystring = require('querystring');
var bcrypt = require("bcryptjs");
var express = require('express');
var passport = require('passport');
var router = express.Router();
var http = require('http');
var Model = require('../models');
var request = require("request");

router.get('/', function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/');
        return;
    }
    res.render('register');
});

router.post('/', function(req, res) {
    request({
        uri: "http://"+req.get('host')+"/api/users/new_user",
        method: "POST",
        json: req.body,
        header: {
            "Content-Type":'application/json'
        }
    }, function(error, response, body) {
        console.log(response);
        if(error){
            res.redirect('/register');
        }else{
            res.redirect('/');
        }
    });
});
module.exports = router;

