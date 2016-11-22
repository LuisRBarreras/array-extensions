require('../dist/array_extensions');
var assert = require('chai').assert;


describe('Array', function () {
	describe('#each', function () {
		it('should execute callback for each element', function () {
			//Setup
			var array = [1, 2, 3];
			var callsCount = 0;
			var itemsReceived = [];
			var itemsExpected = [1, 2, 3];
			var indexesReceived = [];
			var indexesExpected = [0, 1, 2];

			function callbackTest(item, index) {
				itemsReceived.push(item);
				indexesReceived.push(index);
				callsCount++;

			}

			//Execute
			array.each(callbackTest);


			//Compare
			assert.equal(callsCount, 3);
			assert.deepEqual(itemsReceived, itemsExpected);
			assert.deepEqual(indexesReceived, indexesExpected);
		});
	});
});