(function (Array) {
	var extensions = [each, where, any, select, take, skip, first, last, count, index, pluck, sum, flatten];

	extensions.forEach((element) => {
		if(!Array.prototype[element.name]) {
			Array.prototype[element.name] = element;
		} else {
			throw `Function "${element.name}" already exists`;
		}
	});

	function each(callback) {
		var length = this.length;
		var index = 0;

		while (index < length) {
			callback.call(null, this[index], index);
			index++;
		}
	}

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

	function select(callback) {
		return this.map(callback);
	}

	function take(size, callback) {
		var length = this.length;
		var index = 0;
		var newArray = [];

		if (typeof size !== 'number') {
			throw new TypeError('Excepted a number');
		}

		while (index < length) {
			let response = callback.call(null, this[index]);
			if (response) {
				newArray.push(this[index]);
				if(newArray.length === size) {
					return newArray;
				}
			}
			index++;
		}
	}

	function skip(start) {
		var isNotNumber = typeof start !== 'number';
		if (isNotNumber) {
			throw new TypeError('Excepted a number');
		}
		return this.slice(start, this.length);
	}

	function first(callback=null) {
		var length = this.length;
		var index = 0;
		var isFunction = typeof callback === 'function';

		if(!isFunction) {
			return this[0];
		}

		while(index < length) {
			let result = callback.call(null, this[index]);
			if(result) {
				return this[index];
			}
			index++;
		}
		return null;
	}

	function last(callback=null) {
		var length = this.length;
		var index = length-1;
		var isFunction = typeof callback === 'function';

		if(!isFunction) {
			return this.pop();
		}

		while(index >= 0) {
				let result = callback.call(null, this[index]);
				if(result)  {
					return this[index];
				}
				index--;
			}
		return null;
	}

	function count(callback=null) {
		var isFunction = typeof callback === 'function';
		let cb = isFunction ?
			(a, b) => {
				 let result = callback(b);
					if(result) {
						a++;
					}
					return a;
				}
			:
				(a, b) => a + 1;
		return this.reduce(cb, 0);
	}

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

	function pluck(property) {
		return this.map(element => element[property]);
	}

	function sum(spec=null) {
		let anyIsString = this.any(x => typeof x === 'string');
		let isFunction = typeof spec === 'function';

		if(anyIsString) {
			return this.join("");
		}

		let cb = isFunction ? (a, b) => a + spec(b) : (a, b) => a + b;
		return this.reduce(cb, 0);
    }

    function flatten(container=null) {
        var result = container ? container : []; 
        var length = this.length;
        
        return this.reduce((a, b) => {
			let isArray = Array.isArray(b);
			if(isArray) {
                flatten.call(b, result);
			} else {
				a.push(b);
			}
			return a;
		}, result);    
	}
})(global.Array);