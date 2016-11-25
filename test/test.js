require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);


describe('Array #each', function () {
	it('should execute callback for each element', function () {
		//Setup
		var callback  = sinon.spy();

		//Execute
		fixtures.numbers.each(callback);

		//Compare
		assert.equal(callback.callCount, 5);
		assert.isTrue(callback.withArgs(1,0).calledOnce);
		assert.isTrue(callback.withArgs(2,1).calledOnce);
		assert.isTrue(callback.withArgs(3,2).calledOnce);
		assert.isTrue(callback.withArgs(4,3).calledOnce);
		assert.isTrue(callback.withArgs(5,4).calledOnce);
	});

	describe('#skip', function() {
		it('Should return a new array without the first 2 elements', function() {
			//Setup
			var children = [
		    { name: 'ana', sex: 'f' },
		    { name: 'fosto', sex: 'm' },
		    { name: 'jane', sex: 'f' }
			];
			var expected = [
				{ name: 'jane', sex: 'f' }
			];

			//Execute
			var response = children.skip(2);

			//Compare
			assert.deepEqual(response, expected)
		});

		it('Should throw error. invalid parameter type', function() {
			//Setup
			function callback() {
				[1, 3].skip('string');
			}

			//Execute and compare
			assert.throws(callback, TypeError);
		});
	});
});