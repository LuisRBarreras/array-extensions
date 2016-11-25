require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('Array #skip', function() {
	it('Should return a new array without the first 2 elements', function() {
		//Setup
		var expected = [
			{ name: 'jane', sex: 'f' }
		];

		//Execute
		var response = fixtures.children.skip(2);

		//Compare
		assert.deepEqual(response, expected)
	});

	it('Should throw error. invalid parameter type', function() {
		//Setup
		function callback() {
			fixtures.numbers.skip('string');
		}

		//Execute and compare
		assert.throws(callback, TypeError);
	});
});