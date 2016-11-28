(function (Array) {
	var extensions = [each, where, any, select, take, skip, first, last, count, index, pluck];
	var errorMessages = extensions.reduce((ext, m) => {
		ext[m.name] = `Function "${m.name}" already exists`;
		return ext;
	}, {});

	extensions.forEach((element) => {
		if (!Array.prototype[element.name]) {
			Array.prototype[element.name] = element
		} else {
			throw errorMessages[element.name];
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
				newArray.push(this[index])
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
			index++
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

		if(isFunction) {
			while(index < length) {
				let result = callback.call(null, this[index]);
				if(result) {
					return this[index];
				}
				index++;
			}
		} else {
			return this[0];
		}
		return null;
	}

	function last(callback=null) {
		var length = this.length;
		var index = length-1;
		var isFunction = typeof callback === 'function';

		if(isFunction) {
			while(index >= 0) {
				let result = callback.call(null, this[index]);
				if(result)  {
					return this[index];
				}
				index--;
			}
		} else {
			return this.pop();
		}
		return null;
	}

	function count(callback=null) {
		var length = this.length;
		var index = 0;
		var isFunction = typeof callback === 'function';
		var counter = 0;
		if(!isFunction) {
			return length;
		} else {
			while(index < length) {
				let result = callback.call(null, this[index]);
				if(result) {
					counter++;
				}
				index++;
			}
		}
		return counter;
	}

	function index(spec) {
		var length = this.length;
		var arrayIndex = 0;
		var isFunction = typeof spec === 'function';

		while(arrayIndex < length) {
			let result = isFunction ? spec.call(null, this[arrayIndex]) : this[arrayIndex] === spec;
			if(result) {
				return arrayIndex;
			}
			arrayIndex++;
		}
		return -1;
	}

	function pluck(property) {
		return this.map(element => {
			if (element.hasOwnProperty(property)) {
				return element[property];
			}
		});
	}

})(global.Array);