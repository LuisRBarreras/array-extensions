require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #max', function () {
	it('Should return empty', function () {
		//Execute
		let result = fixtures.arrayEmpty.max();

		//Compare
		assert.equal(result, null);
	});

	it('Should use comparator to find max element', function() {
		//Setup
		let expected = { "name": "pablo", "age": 20 };
		let comparator = (a, b) => a.age - b.age;

		//Execute
		let result = fixtures.peopleRandom.max(comparator);

		// Compare
		assert.deepEqual(expected, result);
	});

	it('Should use comparator to find max element in different order', function() {
		//Setup
		let expected = { name: 'pedro', age: 19 };
		let comparator = (a, b) => a.age - b.age;

		//Execute
		var result = fixtures.people.max(comparator);

		//Compare
		assert.deepEqual(expected, result);

	});

	it('Should return first element', function() {
		//Execute
		let result = fixtures.numbers.max();

		//Compare
		assert.equal(result, 5);
	});
});
