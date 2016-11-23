(function (Array) {
	const EACH_ERROR = 'Function Each already exist';
	const WHERE_ERROR = 'Function Where already exist';
	const ANY_ERROR = 'Function Any already exist';
	const SELECT_ERROR= 'Function Select already exist';
	const TAKE_ERROR= 'Function Take already exist';

	var extensions = {
		'each': { method: each, error: EACH_ERROR },
		'where': { method: where, error:WHERE_ERROR },
		'any': { method: any, error:ANY_ERROR },
		'select': { method: select, error:SELECT_ERROR },
		'take': { method: take, error:TAKE_ERROR }
	};

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
		var isFunction  = (typeof spec === 'function');

		while (index < length) {
			let result = isFunction ? spec(this[index]) : this[index] === spec;
			if (result) return true;
			index++
		}
		return false;
	}

	function select(callback) {
		var length = this.length;
		var index = 0;
		var newArray = [];

		while (index < length) {
			newArray.push(callback.call(null, this[index]));
			index++;
		}
		return newArray;
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
			}
			index++;
		}
		return newArray.slice(0, size)
	}

	for (let key in extensions) {
		if (!Array.prototype[key]) {
			Array.prototype[key]= extensions[key].method
		} else {
			throw extensions[key].error
		}
	}

})(global.Array);