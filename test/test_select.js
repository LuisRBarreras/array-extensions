require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('Array #select', function() {
	it('Should create a new array with the output of the callback', function() {
		//Setup
 		var callback = sinon.spy(people => people.name);
		//Execution
		var response = fixtures.people.select(callback);

		//Compare
		assert.deepEqual(response, ['juan', 'pablo', 'topo', 'pedro']);
		assert.equal(callback.callCount, 4);
	});
});