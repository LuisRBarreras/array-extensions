(function (Array) {
	const EACH_ERROR = 'Function Each already exist';
	const WHERE_ERROR = 'Function Where already exist';
	const ANY_ERROR = 'Function Any already exist';

	var extensions = {
		'each': { method: each, error: EACH_ERROR },
		'where': { method: where, error:WHERE_ERROR },
		'any': { method: any, error:ANY_ERROR }
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
	
	for (let key in extensions) {
		if (!Array.prototype[key]) {
			Array.prototype[key]= extensions[key].method
		} else {
			throw extensions[key].error
		}
	}

})(global.Array);
