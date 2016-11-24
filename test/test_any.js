require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');

describe('Array #any', function() {
	it('should return true and call function 3 times', function() {
		//Setup
		var people = [
			{ name: 'juan', age: 15 },
			{ name: 'pablo', age: 16 },
			{ name: 'topo', age: 18 },
			{ name: 'pedro', age: 19 }
    ];
		var callback = sinon.spy(person => person.name === 'topo' );

		//Execute
		var response = people.any(callback);

		//Compare
		assert.isTrue(response);
		assert.equal(callback.callCount, 3);
	});

	it('should return false and call function twice', function() {
		//Setup
		var people = [
			{ name: 'juan', age: 15 },
			{ name: 'pablo', age: 16 }
    ];
		var callback = sinon.spy(person => person.name === 'non-exist');

		//Execute
		var response = people.any(callback);

		//Compare
		assert.isNotTrue(response);
		assert.equal(callback.callCount, 2);
	});

	it('should return true and compare', function() {
		//Setup
		var array = ['hello', 'world'];

		//Execute
		var response = array.any('world');

		//Compare
		assert.isTrue(response);
	});

	it('should return false and compare', function() {
		//Setup
		var array = ['hello', 'world'];

		//Execute
		var response = array.any('worlds');

		//Compare
		assert.isFalse(response);
	});
});