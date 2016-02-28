/**
 *
 * Created by reed on 2/27/16.
 */

var express = require('express');
var passport = require('passport');
var Model = require('../models');
var router = express.Router();

router.get('/top/:num_tags', function(req, res) {
  Model.Tag.find({ order: '"popularity" DESC', limit: req.params.num_tags}).then( function(tags) {
    var tagJson = [];
    tags.forEach(function (obj) {
      tagJson.push(obj.dataValues);
    });
    res.json(tagJson);
  });
});


