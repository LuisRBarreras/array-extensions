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

	describe('#first', function() {
		it('Should return first element', function() {
			//Setup
			var array = [1,2,3];

			//Execute
			var response = array.first();

			//Compare
			assert.equal(response, 1);
		});

		it('Should return second element', function() {
			//Setup
			var children = [
		    { name: 'ana', sex: 'f' },
		    { name: 'fosto', sex: 'm' },
		    { name: 'jane', sex: 'f' }
			];
			var expected =  { name: 'fosto', sex: 'm' };
			var callback = sinon.stub();

			callback.withArgs(children[0]).returns(false);
			callback.withArgs(children[1]).returns(true);

			//Execute
			var response = children.first(callback);

			//Compare
			assert.deepEqual(response, expected);
			assert.equal(callback.callCount, 2);
			assert.isTrue(callback.withArgs(children[0]).calledOnce);
			assert.isTrue(callback.withArgs(children[1]).calledOnce);
		});

		it('Should return null, not pass the spec condition', function() {
			//Setup
			var children = [
		    { name: 'ana', sex: 'f' },
		    { name: 'fosto', sex: 'm' },
			];
			var expected =  null;
			var callback = sinon.stub();

			callback.withArgs(children[0]).returns(false);
			callback.withArgs(children[1]).returns(false);

			//Execute
			var response = children.first(callback);

			//Compare
			assert.equal(callback.callCount, 2);
			assert.deepEqual(response, expected);
			assert.isTrue(callback.withArgs(children[0]).calledOnce);
			assert.isTrue(callback.withArgs(children[1]).calledOnce);
		});
	});
});