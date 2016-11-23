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
});