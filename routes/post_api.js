/**
 * Created by reed on 2/27/16.
 */
var Model = require("../models");
var express = require("express");
var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/:course_id', function (req, res) {
    Model.Course.findOne({
        where: {
            course_id: req.params.course_id
        }
    }).then(function(course) {
        res.json(course.dataValues);
    })
});

