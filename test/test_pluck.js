var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #pluck', function () {
	it('should retrieve the property each element', function () {
		//Setup
		var expected = ['juan', 'pablo', 'topo', 'pedro'];

		//Execute
		var response = fixtures.people.pluck('name');


		//Compare
		assert.deepEqual(response, expected);
	});

	it('should retrieve the property each element', function () {
		//Setup
		var expected = [undefined, undefined, undefined, undefined];

		//Execute
		var response = fixtures.people.pluck('nonexist');

		//Compare
		assert.deepEqual(response, expected);
	});
});