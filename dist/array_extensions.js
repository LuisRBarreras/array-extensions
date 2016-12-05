/**
 * Extend Array prototype adding a very useful functional programming helpers.
 * @namespace ArrayExtensions
 */
(function (Array) {
	var extensions = [each, where, any, select, take, skip, first, last, count, index, pluck, sum, max];

	extensions.forEach((element) => {
		if(!Array.prototype[element.name]) {
			Array.prototype[element.name] = element;
		} else {
			throw `Function "${element.name}" already exists`;
		}
	});

    /** 
     * Executes a provided function once per array element.
     * @memberof ArrayExtensions
     * @param {Function} callback - execute for each element.
     */
	function each(callback) {
		var length = this.length;
		var index = 0;

		while (index < length) {
			callback.call(null, this[index], index);
			index++;
		}
	}

    /** 
     * Creates a new array that contains all the elements that satisfies the given specification.
     * @memberof ArrayExtensions
     * @param {Function} spec - Function that decide if the element shall or not to be included on the new array.
     * @return {Array} newArray contains the elements.
     */
	function where(callback) {
		var length = this.length;
		var index = 0;
		var newArray = [];

		while (index < length) {
			let response = callback.call(null, this[index]);
			if (response === true) {
				newArray.push(this[index]);
			}
			index++;
		}
		return newArray;
	}

    /** 
     * Returns a true value if any of the elements in the array satisfies <b><i>spec</i></b>.
     * @memberof ArrayExtensions
     * @param {Function} spec - whenever the function returns a true value then immediately stop execution and returns true. 
     * @return {Boolean}
     */
	function any(spec) {
		var length = this.length;
		var index = 0;
		var isFunction = (typeof spec === 'function');

		while (index < length) {
			let result = isFunction ? spec(this[index]) : this[index] === spec;
			if (result) return true;
			index++;
		}
		return false;
	}

    /** 
     * Creates a new collection containing the result from the execution of the <b><i>spec</i></b>.
     * @memberof ArrayExtensions
     * @param {Function} spec - Function to execute for each element and should return a value.
     * @return {Boolean}
     */
	function select(callback) {
		return this.map(callback);
	}

    /**
     * Creates a new array containing ideally howMany element, it could be less but no more.
     * @memberof ArrayExtensions
     * @params {Number} howMany - the size of array result if there are enought elements
     * @params {Function} spec - executes for each element and returns true or false
     * @throws TypeError Expected a number  
     * @return {Array} newArray containing the element that satisfies the spec
     */
	function take(howMany, spec) {
		var length = this.length;
		var index = 0;
		var newArray = [];

		if (typeof howMany !== 'number') {
			throw new TypeError('Expected a number');
		}

		while (index < length) {
			let response = spec.call(null, this[index]);
			if (response) {
				newArray.push(this[index]);
				if(newArray.length === howMany) {
					return newArray;
				}
			}
			index++;
		}
	}

    /**
     * Creates a new array which not include the first howManyElement
     * @memberof ArrayExtensions
     * @params {Number} howMany - the numbers of elements not include on the result
     * @throws TypeError Expected a number
     * @return {Array} newArray not include the first howManyElement
     */
	function skip(howMany) {
		var isNotNumber = typeof howMany !== 'number';
		if (isNotNumber) {
			throw new TypeError('Expected a number');
		}
		return this.slice(howMany, this.length);
	}

    /**
     * Returns the first element on collection that satisfies the <b><i>spec</i></b>. </br>
     * If the spec is null returns the first element.
     * @memberof ArrayExtensions
     * @param {Function} spec - Executes for each value until one satisfies the condition. 
     * @return {Object} element
     */
	function first(spec=null) {
		var length = this.length;
		var index = 0;
		var isFunction = typeof spec === 'function';

		if(!isFunction) {
			return this[0];
		}

		while(index < length) {
			let result = spec.call(null, this[index]);
			if(result) {
				return this[index];
			}
			index++;
		}
		return null;
	}

    /**
     * Returns the last element on collection that satisfies the <b><i>spec</i></b>. <br>
     * If <b><i>spec</i></b> is null returns the last element.
     * @memberof ArrayExtensions
     * @param {Function} spec - Executes for each value until one satisfies the condition. Iteration order is backwards.
     * @return {Object} element
     */
	function last(spec=null) {
		var length = this.length;
		var index = length-1;
		var isFunction = typeof spec === 'function';

		if(!isFunction) {
			return this.pop();
		}

		while(index >= 0) {
				let result = spec.call(null, this[index]);
				if(result)  {
					return this[index];
				}
				index--;
			}
		return null;
	}

    /**
     * Returns the numbers of elements on the collection that satisfies the <b><i>spec</i></b>. </br>
     * If <b><i>spec</i></b> is null returns the array length.
     * @memberof ArrayExtensions
     * @param {Function} spec - Executes for each element.
     * @return {Number} the number of elements that satisfies the spec. 
     */
	function count(spec=null) {
		var isFunction = typeof spec === 'function';
		let cb = isFunction ?
			(a, b) => {
				 let result = spec(b);
					if(result) {
						a++;
					}
					return a;
				}
			:
				(a, b) => a + 1;
		return this.reduce(cb, 0);
	}

    /**
     * Returns the zero based position in the array of the element that satisfies the <b><i>spec</i></b>.
     * @memberof ArrayExtensions
     * @param {Function} spec - Executes for each element.
     * @return {Number} Index of the element found.
     */
	function index(spec) {
		var length = this.length;
		var isFunction = typeof spec === 'function';

		for(let i=0; i < length; i++) {
			let result = isFunction ? spec(this[i]) : this[i] === spec;
			if(result) {
				return i;
			}
		}
		return -1;
	}

    /**
     * Returns a new array containing that property value for each element on the array.
     * @memberof ArrayExtensions
     * @param {String} property Name of the property.
     * @returns {Array} newArray with the property extracted from each element.
     */
	function pluck(property) {
		return this.map(element => element[property]);
	}

    /**
     * Returns the summatory of the result of executing <b><i>spec</i></b> function on each arrays element.</br>
     * If there is not a <b><i>spec</i></b> function will return the summatory of the array's elements.</br>
     * <strong>Note:</strong> In case that elements are not numbers it will concatenate as string.
     * @memberof ArrayExtensions
     * @returns {Number|String} summatory
     */
	function sum(spec=null) {
		let anyIsString = this.any(x => typeof x === 'string');
		let isFunction = typeof spec === 'function';

		if(anyIsString) {
			return this.join("");
		}

		let cb = isFunction ? (a, b) => a + spec(b) : (a, b) => a + b;
		return this.reduce(cb, 0);
	}

    /**
     * Returns the maximum value on the collection, In case of array empty returns null. </br> 
     * If <strong><i>comparator</i></strong> is not specified then it evaluates the array elements as numbers.
     * @memberof ArrayExtensions
     * @param {Function} comparator Receives 2 parameters, <strong><i>a</i></strong> and <strong><i>b</strong></i>. </br> Return a negative number for a < b scenario, </br> zero when a === b and finally a positive number when a > b.
     * @returns {Number} Max value
     */
	function max(comparator=null) {
		var length = this.length;
		if(length < 1) {
			return null;
		}

		if(comparator === null) {
			return Math.max(...this);
		}

		let cb = (a,b) => comparator(a ,b) > 0 ? a : b;
		return this.reduce(cb, this[0]);
	}

})(global.Array);
