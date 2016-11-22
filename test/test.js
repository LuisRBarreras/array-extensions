require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');

describe('Array', function () {
	describe('#each', function () {
		it('should execute callback for each element', function () {
			//Setup
			var array = [1, 2, 3];
			var callback  = sinon.spy();

			//Execute
			array.each(callback);

			//Compare
			assert.equal(callback.callCount, 3);
			assert.deepEqual(callback.getCall(0).args, [1,0]);
			assert.deepEqual(callback.getCall(1).args, [2,1]);
			assert.deepEqual(callback.getCall(2).args, [3,2]);
		});
	});

	describe('#where', function() {
		it('should return a new array filtered', function() {
			//Setup
			var array = [2, 5, 6];
      var callback = sinon.stub();
			callback.onCall(0).returns(false);
			callback.onCall(1).returns(true);
			callback.onCall(2).returns(true);

			//Execute
			var newArray = array.where(callback);

			//Compare
			assert.equal(callback.callCount,3);
			assert.deepEqual(callback.getCall(0).args, [2]);
			assert.deepEqual(callback.getCall(1).args, [5]);
			assert.deepEqual(callback.getCall(2).args, [6]);
			assert.deepEqual(newArray, [5,6]);
		})
	})
});