require('../dist/array_extensions');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile  =require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('Array #take', function() {
    it('Should return a new array of with 2 values', function() {
        //Setup
        var expected = [
            { name: 'ana', sex: 'f' },
            { name: 'jane', sex: 'f' }
        ];
        var callback = sinon.spy(child => child.sex === 'f');

        //Execute
        var response = fixtures.children.take(2, callback);

        //Compare
        assert.deepEqual(response, expected);
        assert.equal(callback.callCount, 3);
    });

    it('Should return a new array of with the size of the limit', function() {
        //Setup
        var expected = [
            { name: 'ana', sex: 'f' }
        ];
        var callback = sinon.spy(child => child.sex === 'f');

        //Execute
        var response = fixtures.children.take(1, callback);

        //Compare
        assert.deepEqual(response, expected);
        assert.equal(callback.callCount, 1);
    });

    it('Should throw error. invalid parameter type', function() {
        //Setup
        function callback() {
            fixtures.numbers.take('hello', function(){});
        }

        //Execute and compare
        assert.throws(callback, TypeError);
    });
});