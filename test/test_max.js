require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #max', function () {
	it('Should return empty', function () {
		//Execute
		var result = fixtures.arrayEmpty.max();

		//Compare
		assert.equal(result, null);
	});

	it('Should use comparator to find max element', function() {
		//Setup
		var expected = { "name": "pablo", "age": 20 };
		var callback = function(a, b) {
			return a.age - b.age;
		};

		//Execute
		var result = fixtures.peopleRandom.max(callback);

		// Compare
		assert.deepEqual(expected, result);
	});

	it('Should use comparator to find max element in different order', function() {
		//Setup
		var expected = { name: 'pedro', age: 19 };
		var callback = function(a, b) {
			return a.age - b.age;
		};

		//Execute
		var result = fixtures.people.max(callback);

		//Compare
		assert.deepEqual(expected, result);

	});

	it('Should return first element', function() {
		//Execute
		var result = fixtures.numbers.max();

		//Compare
		assert.equal(result, 5);
	});
});
