require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('Array #first', function() {
		it('Should return first element', function() {

			//Execute
			var response = fixtures.numbers.first();

			//Compare
			assert.equal(response, 1);
		});

		it('Should return second element', function() {
			//Setup
			var expected =  { name: 'fosto', sex: 'm' };
			var callback = sinon.spy(child => child.sex === 'm');


			//Execute
			var response = fixtures.children.first(callback);
			console.log(response);

			//Compare
			assert.deepEqual(response, expected);
			assert.equal(callback.callCount, 2);
		});

		it('Should return null, not pass the spec condition', function() {
			//Setup
			var callback = sinon.spy(child => child.sex === null);

			//Execute
			var response = fixtures.children.first(callback);

			//Compare
			assert.equal(callback.callCount, 3);
			assert.isNull(response);
		});
	});