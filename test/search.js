const chai = require('chai')
const expect = chai.expect

const search = require('../logic/search')

describe('search', function(){
	describe('getTokens', function(){
		it('should ignore words of 3 letter or less', function(){
			expect(search.getTokens('foo a the if test or complicated'))
				.to.eql(['test', 'complicated'])
		})
		it('should handle odd whitespace', function(){
			expect(search.getTokens('test  test\ttest \n test'))
				.to.eql(['test', 'test', 'test', 'test'])
		})
	})
	describe('getSearchData', function(){
		it('should handle empty data', function(){
			expect(search.getSearchData([]))
				.to.eql({})
		})
		it('should tally multilple occurrences of the same token', function(){
			expect(search.getSearchData(['a', 'a', 'a']))
				.to.eql({a: 3})
		})
		it('should tally various things', function(){
			expect(search.getSearchData(['a', 'a', 'b', 'c']))
				.to.eql({a: 2, b: 1, c: 1})
		})
	})
	describe('calculateSearchDataRank', function(){
		it('should rank irrelevant data at 0', function(){
			expect(search.calculateSearchDataRank({a: 1, b: 2}, ['c']))
				.to.equal(0)
		})
		it('should add the ranks of relevant terms', function(){
			expect(search.calculateSearchDataRank({a: 1, b: 2}, ['a']))
				.to.equal(1)
			expect(search.calculateSearchDataRank({a: 1, b: 2}, ['b']))
				.to.equal(2)
			expect(search.calculateSearchDataRank({a: 1, b: 2}, ['a', 'b']))
				.to.equal(3)
		})
	})
	describe('sortBy', function(){
		it('should work', function(){
			expect(search.sortBy([1,2,3], function(x){ return -x }))
				.to.eql([3,2,1])
		})
	})
})
