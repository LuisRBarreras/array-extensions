require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #where', function() {
	it('should return a new array filtered', function() {
		//Setup
    var callback = sinon.spy(number => number > 3);

		//Execute
		var newArray = fixtures.numbers.where(callback);

		//Compare
		assert.equal(callback.callCount,5);
		assert.deepEqual(newArray, [4, 5]);
	});
});