/**
 * Attempt to symbolize any response object from DynamoDB-like object
 * @param {Object} data from DynamoDB
 * @returns {Object} symbolized data
 */
exports.symbolize = function(data) {
	if(typeof data == "object") {
		var symbol = symbolizeValue(data);
		if(symbol == null) for(fieldName in data) data[fieldName] = this.symbolize(data[fieldName]);
		else data = symbol;
	}
	return data;
}

// expects a { N: "number" } object; failing this, returns null for futher iteration
function symbolizeValue(data) {
	if(data.N != undefined) return parseInt(data.N);
	if(data.S != undefined) return data.S;
	if(data.B != undefined) return new Buffer(data.B, "base64");
	if(data.SS != undefined) return data.SS;
	if(data.NS != undefined) {
		var array = [];
		for(i in data.NS) array.push(parseInt(data.NS[i]));
		return array;
	}
	if(data.BS != undefined) {
		var array = [];
		for(i in data.BS) array.push(new Buffer(data.BS[i], "base64"));
		return array;
	}
	return null;
}