require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #count', function () {
	it('should return two', function () {
		//Setup
		var callback = sinon.spy(number => number % 2 === 0);

		//Execute
		var response = fixtures.numbers.count(callback);

		//Compare
		assert.equal(callback.callCount, 5);
		assert.equal(response, 2);
	});

	it('Should return array length', function() {
		//Execute
		var response = fixtures.numbers.count();

		//Compare
		assert.equal(5, response);
	});

	it('Should return zero', function() {
		//Setup
		var callback = sinon.spy(number => number > 10000);

		//Execute
		var response = fixtures.numbers.count(callback);

		//Compare
		assert.equal(callback.callCount, 5);
		assert.equal(response, 0);
	})
});