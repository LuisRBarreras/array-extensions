require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('Array #last', function() {
		it('Should return last element', function() {
			//Execute
			var response = fixtures.numbers.last();

			//Compare
			assert.equal(response, 5);
		});

		it('Should return the second element that pass the spec condition', function() {
			//Setup
			var expected =  { name: 'jane', sex: 'f' };
			var callback = sinon.spy(child => child.sex === 'f');


			//Execute
			var response = fixtures.children.last(callback);

			//Compare
			assert.deepEqual(response, expected);
			assert.equal(callback.callCount, 1);
		});

		it('Should return null, not pass the spec condition', function() {
			//Setup
			var callback = sinon.spy(child => child.sex === null);

			//Execute
			var response = !!fixtures.children.last(callback);

			//Compare
			assert.equal(callback.callCount, 3);
			assert.isFalse(response);
		});
	});