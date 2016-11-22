(function () {
	const EACH_ERROR = 'Function Each already exist';

	function each(callback) {
		var length = this.length;
		var index = 0;

		while (index < length) {
			callback.call(null, this[index], index);
			index++;
		}
	}

	if (!Array.prototype.each) {
		Array.prototype.each = each;
	} else {
		throw  EACH_ERROR;
	}
})(Array);