
module.exports = {
	getTokens: function(data){
		return data
			.split(/\s+/)
			.filter(function(token){
				// avoid "the" and friends ?
				return token.length > 3
			})
	},
	getSearchData: function(tokens){
		return tokens.reduce(function(acc, token){
			acc[token] = acc[token] ? acc[token] + 1 : 1
			return acc
		}, {})
	},
	calculateSearchDataRank: function(search_data, terms){
		// add together appearance of search terms
		return terms.reduce(function(rank, term){
			return rank + search_data[term] || 0
		}, 0)
	},
	sortBy: function(data, costFn){
		return data.sort(function(a, b){
			return costFn(a) - costFn(b);
		})
	}
}
