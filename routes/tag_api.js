/**
 <<<<<<< Updated upstream
 *
 * Created by reed on 2/27/16.
 */

var express = require('express');
var passport = require('passport');
var Model = require('../models');
var router = express.Router();

router.get('/top/:num_tags', function(req, res) {
  Model.Tag.findAll({ order: '"popularity" DESC', limit: req.params.num_tags}).then( function(tags) {
    var tagJson = [];
    tags.forEach(function (obj) {
      tagJson.push(obj.dataValues);
    });
    res.json(tagJson);
  });
});

router.get('/:tag_id/top_posts/:num_posts', function(req, res) {
  Model.Tag.find({
    where: {id : req.params.tag_id}
  }).then(function(tag) {
    console.log(tag);
    tag.getPosts().then(function(post) {
      console.log(post);
      res.json(post);
    });
  });
});
module.exports = router;


