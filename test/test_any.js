require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('Array #any', function() {
	it('should return true and call function 3 times', function() {
		//Setup
		var callback = sinon.spy(person => person.name === 'topo' );

		//Execute
		var response = fixtures.people.any(callback);

		//Compare
		assert.isTrue(response);
		assert.equal(callback.callCount, 3);
	});

	it('should return false and call function twice', function() {
		//Setup
		var callback = sinon.spy(person => person.name === 'non-exist');

		//Execute
		var response = fixtures.people.any(callback);

		//Compare
		assert.isNotTrue(response);
		assert.equal(callback.callCount, 4);
	});

	it('should return true and compare', function() {

		//Execute
		var response = fixtures.numbers.any(3);

		//Compare
		assert.isTrue(response);
	});

	it('should return false and compare', function() {

		//Execute
		var response = fixtures.numbers.any(10);

		//Compare
		assert.isFalse(response);
	});
});