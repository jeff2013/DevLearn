/**
 * Created by reed on 2/27/16.
 */
var Model = require("../models");
var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/:post_id', function (req, res) {
    Model.Post.findOne({
        where: {
            id: req.params.post_id
        }
    }).then(function(post) {
        res.json(post.dataValues);
    })
});

module.exports = router;