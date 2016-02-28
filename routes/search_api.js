const express = require('express')
const router = express.Router()
const Model = require('../models')

const search = require('../logic/search')

router.get('/:query', function(req, res){
	const query = req.params.query.split('+')
	Model.SearchData.findAll(/*{
		where:{
			data: {
				$contains: query
			}
		}
	}*/).then(function(results){
		console.log('search results: ', results)
		return Promise.all(
			search.sortBy(results, function(result){
				return search.calculateSearchDataRank(result, query)
			})
			.map(function(search_data){
				return search_data.getPost();
			})
		)
	}).then(function(posts){
		res.json(posts.map(function(post){
			return post.id
		}))
	})
})

module.exports = router
