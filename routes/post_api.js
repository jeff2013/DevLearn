/**
 * Created by reed on 2/27/16.
 */
var Model = require("../models");
var express = require('express');
var search = require('../logic/search');
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


router.post('/new_post', function(req, res) {
    var body = req.body;
    // Find the user details
    Model.User.findOne({
        where: { username: body.username }
    }).then(function(user) {
        console.log("USER: "+ Object.keys(user));
        var new_post = Model.Post.build({
            title: body.title,
            type: body.type,
            content: body.content,
            popularity: 0,
            image_url: body.image_url
        })
        return new_post.save().then(function(post){
            return user.addPost(post)
        }).then(function(){
            return new_post;
        })
    }).then(function(post) {
        var output = [Promise.resolve(post)]
            .concat(
                body.tags.map(function (tag) {
                    return Model.Tag.findOrCreate({
                        where: {
                            title: tag
                        }
                    }).then(function(result) {
                        console.log("TAG:", result[0]);
                        return result[0];
                    });
                })
            )
        console.log("PROMISE MAP: ", output)
        return Promise.all(output);
    }).then(function(tags) {
        var post = tags.shift()
        return post.addTags(tags).then(function() {
            return post;
        })
    }).then(function(post){
		var search_data = Model.SearchData.build({
			data: JSON.stringify(search.getSearchData(
				search.getTokens(body.content)))
		})
		return search_data.setPost(post).then(function(){
			return post
		})
	}).then(function(post){
        res.json({ result: post.dataValue })
    }).catch(function(err){
        console.error(err);
        res.status(500).end();
    });
});

module.exports = router;
