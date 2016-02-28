const express = require('express')
const router = express.Router()
const Model = require('../models')

const search = require('../logic/search')

router.get('/:query', function(req, res){
	const query = req.params.query.split('+')
	Model.SearchData.findAll({
		where:{
			data: {
				$contains: query
			}
		}
	}).then(function(results){
		res.json(
			search.sortBy(results,
				search.calculateSearchDataRank))
	})
})

module.exports = router
