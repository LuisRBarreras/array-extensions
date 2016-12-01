require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #index', function () {
	it('Should pass callback and find index equals 1', function () {
		//Setup
		var callback  = sinon.spy(people => people.name === 'pablo');

		//Execute
		var response = fixtures.people.index(callback);

		//Compare
		assert.equal(callback.callCount, 2);
		assert.equal(response, 1);
	});

	it('Should return -1', function () {
		//Setup
		var callback  = sinon.spy(people => people.name === null);

		//Execute
		var response = fixtures.people.index(callback);

		//Compare
		assert.equal(callback.callCount, 4);
		assert.equal(response, -1);
	});

	it('Should pass spec and return 3', function() {
		//Execute
		var response = fixtures.numbers.index(3);

		//Compare
		assert.equal(response, 2);
	})
});