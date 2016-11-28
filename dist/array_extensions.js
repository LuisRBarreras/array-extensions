(function (Array) {
	var extensions = [each, where];
	var errorMessages = extensions.reduce((ext, m) => {
		ext[m.name] = `Function "${m.name}" already exists`;
		return ext;
	},{});

	extensions.forEach((element) => {
		if(!Array.prototype[element.name]) {
			Array.prototype[element.name] = element;
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
				newArray.push(this[index]);
			}
			index++;
		}
		return newArray;
	}
})(global.Array);