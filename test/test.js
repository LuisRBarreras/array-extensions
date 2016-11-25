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
});