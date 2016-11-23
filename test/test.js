require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');

describe('Array', function () {
	describe('#each', function () {
		it('should execute callback for each element', function () {
			//Setup
			var array = [1, 2, 3];
			var callback  = sinon.spy();
			callback.withArgs(1,0);
			callback.withArgs(2,1);
			callback.withArgs(3,2);

			//Execute
			array.each(callback);

			//Compare
			assert.equal(callback.callCount, 3);
			assert.isTrue(callback.withArgs(1,0).calledOnce);
			assert.isTrue(callback.withArgs(2,1).calledOnce);
			assert.isTrue(callback.withArgs(3,2).calledOnce);
		});
	});

	describe('#where', function() {
		it('should return a new array filtered', function() {
			//Setup
			var array = [2, 5, 6];
      var callback = sinon.stub();
			callback.withArgs(2).returns(false);
			callback.withArgs(5).returns(true);
			callback.withArgs(6).returns(true);

			//Execute
			var newArray = array.where(callback);

			//Compare
			assert.equal(callback.callCount,3);
			assert.isTrue(callback.withArgs(2).calledOnce);
			assert.isTrue(callback.withArgs(5).calledOnce);
			assert.isTrue(callback.withArgs(6).calledOnce);
			assert.deepEqual(newArray, [5,6]);
		})
	});

	describe('#any', function() {
		it('should return true and call function 3 times', function() {
			//Setup
			var people = [
				{ name: 'juan', age: 15 },
				{ name: 'pablo', age: 16 },
				{ name: 'topo', age: 18 },
				{ name: 'pedro', age: 19 }
	    ];
			var callback = sinon.stub();
			callback.withArgs({ name: 'juan', age: 15 }).returns(false);
			callback.withArgs({ name: 'pablo', age: 16 }).returns(false);
			callback.withArgs({ name: 'topo', age: 18 }).returns(true);
			callback.withArgs({ name: 'pedro', age: 19 }).returns(true);

			//Execute
			var response = people.any(callback);

			//Compare
			assert.isTrue(response);
			assert.equal(callback.callCount,3);
			assert.isTrue(callback.withArgs({ name: 'juan', age: 15 }).calledOnce);
			assert.isTrue(callback.withArgs({ name: 'pablo', age: 16 }).calledOnce);
			assert.isTrue(callback.withArgs({ name: 'topo', age: 18 }).calledOnce);
			assert.isNotTrue(callback.withArgs({ name: 'pedro', age: 19 }).calledOnce);
		});

		it('should return false and call function twice', function() {
			//Setup
			var people = [
				{ name: 'juan', age: 15 },
				{ name: 'pablo', age: 16 }
	    ];
			var callback = sinon.stub();
			callback.withArgs({ name: 'juan', age: 15 }).returns(false);
			callback.withArgs({ name: 'pablo', age: 16 }).returns(false);

			//Execute
			var response = people.any(callback);

			//Compare
			assert.isNotTrue(response);
			assert.equal(callback.callCount,2);
			assert.isTrue(callback.withArgs({ name: 'juan', age: 15 }).calledOnce);
			assert.isTrue(callback.withArgs({ name: 'pablo', age: 16 }).calledOnce);
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

	describe('#select', function() {
		it('Should create a new array with the output of the callback', function() {
			//Setup
			var people = [
				{ name: 'juan', age: 15 },
				{ name: 'pablo', age: 16 },
				{ name: 'pedro', age: 19 }
	    ];
			var callback = sinon.stub();
			callback.withArgs({ name: 'juan', age: 15 }).returns('juan');
			callback.withArgs({ name: 'pablo', age: 16 }).returns('pablo');
			callback.withArgs({ name: 'pedro', age: 19 }).returns('pedro');

			//Execution
			var response = people.select(callback);

			//Compare
			assert.deepEqual(response, ['juan', 'pablo', 'pedro']);
			assert.equal(callback.callCount, 3);
			assert.isTrue(callback.withArgs({ name: 'juan', age: 15 }).calledOnce);
			assert.isTrue(callback.withArgs({ name: 'pablo', age: 16 }).calledOnce);
			assert.isTrue(callback.withArgs({ name: 'pedro', age: 19 }).calledOnce);

		});
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