(function (Array) {
	var extensions = [each, where, any, select, take, skip];
	var errorMessages = extensions.reduce((ext, m) => {
		ext[m.name] = `Function "${m.name}" already exists`;
		return ext;
	},{});

	extensions.forEach((element) => {
		if(!Array.prototype[element.name]) {
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
		if (typeof size !== 'number') {
			throw new TypeError('Excepted a number');
		}

		return this.filter(callback).slice(0, size);
	}

	function skip(start) {
		var isNotNumber = typeof start !== 'number';
		if (isNotNumber) {
			throw new TypeError('Excepted a number');
		}

		return this.slice(start, this.length);
	}
	
})(global.Array);