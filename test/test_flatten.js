require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #flatten', function () {
	it('Should return a flat array', function () {
		//Setup
		var expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

		//Execute
		var result = fixtures.nestedArray.flatten();

		//Compare
		assert.deepEqual(result, expected);
	});
});