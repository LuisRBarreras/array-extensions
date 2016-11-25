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

	describe('take', function() {
		it('Should return a new array of with 2 values', function() {
			//Setup
			var children = [
		    { name: 'ana', sex: 'f' },
		    { name: 'fosto', sex: 'm' },
		    { name: 'jane', sex: 'f' }
			];
			var expected = [
		    { name: 'ana', sex: 'f' },
		    { name: 'jane', sex: 'f' }
			];
			var callback = sinon.stub();
			callback.withArgs(children[0]).returns(true);
			callback.withArgs(children[1]).returns(false);
			callback.withArgs(children[2]).returns(true);

			//Execute
			var response = children.take(2, callback);

			//Compare
			assert.deepEqual(response, expected);
			assert.equal(callback.callCount, 3);
			assert.isTrue(callback.withArgs(children[0]).calledOnce);
			assert.isTrue(callback.withArgs(children[1]).calledOnce);
			assert.isTrue(callback.withArgs(children[2]).calledOnce);
		});

		it('Should return a new array of with the size of the limit', function() {
			//Setup
			var children = [
		    { name: 'ana', sex: 'f' },
		    { name: 'fosto', sex: 'm' },
		    { name: 'jane', sex: 'f' }
			];
			var expected = [
		    { name: 'ana', sex: 'f' }
			];
			var callback = sinon.stub();
			callback.withArgs(children[0]).returns(true);
			callback.withArgs(children[1]).returns(false);
			callback.withArgs(children[2]).returns(true);

			//Execute
			var response = children.take(1, callback);

			//Compare
			assert.deepEqual(response, expected);
			assert.equal(callback.callCount, 3);
			assert.isTrue(callback.withArgs(children[0]).calledOnce);
			assert.isTrue(callback.withArgs(children[1]).calledOnce);
			assert.isTrue(callback.withArgs(children[2]).calledOnce);
		});

		it('Should throw error. invalid parameter type', function() {
			//Setup
			function callback() {
				[1, 2, 3].take('hello', function(){});
			}

			//Execute and compare
			assert.throws(callback, TypeError);
		});
	});
});