require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #sum', function () {
	it('Should return the sum of all elements', function () {
		//Execute
		var result = fixtures.numbers.sum();

		//Compare
		assert.equal(result, 15);
	});

	it('Should execute the function and sum the value for each element', function() {
		//Setup
		var callback = sinon.spy(x => x * 2);

		//Execute
		var result = fixtures.numbers.sum(callback);

		//Compare
		assert.equal(callback.callCount, 5);
		assert.equal(result, 30);
	});

	it('Should concatenate the values mix', function() {
		//Execute
		var response = fixtures.mixValues.sum();

		//Compare
		assert.equal('hello110world', response);
	});
});
