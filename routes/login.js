/**
 * Created by jeffchang on 2016-02-27.
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();
var http = require('http');

// shash for root

router.post('/', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

//getting the loginPage
router.get('/', function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/')
        return;
    }
    res.render('login');
});

module.exports = router;