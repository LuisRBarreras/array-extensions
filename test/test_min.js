require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #min', function () {
	it('Should return empty', function () {
		//Execute
		let result = fixtures.arrayEmpty.min();

		//Compare
		assert.equal(result, null);
	});

	it('Should find min integer on array of numbers', function() {
		//Execute
		let result = fixtures.numbers.min();

		//Compare
		assert.equal(result, 1);
	});


	it('Should find the person older, checking the attribute age', function() {
		//Setup
		let expected = { name: 'juan', age: 15 };
		let callback = (a, b) => a.age - b.age;

		//Execute
		var result = fixtures.people.min(callback);

		//Compare
		assert.deepEqual(expected, result);
	});
});
