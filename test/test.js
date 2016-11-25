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
});