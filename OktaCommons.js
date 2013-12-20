/**
 * Created by jjohnson on 12/13/13.
 */

exports.StringBuilder = StringBuilder;

/**
 * Create a string builder to repeatedly concatenate strings for you
 * @param separator optional separator to include in appending
 * @constructor
 */

function StringBuilder(separator) {
    this.str = "";
    this.separator = separator;
    this.shouldSeparate = !(separator == undefined)
}

/**
 * Append a string to the string we are building
 * @method append
 * @param str
 */
StringBuilder.prototype.append = function(str) {
    if (this.separator != undefined && this.shouldSeparate) str += this.separator;
    this.shouldSeparate = true;
    this.str += str;
}

/**
 * Returns the string we are building
 * @returns {string}
 */
StringBuilder.prototype.toString = function() {
    return this.str;
}

/**
 * Returns whether or not we will attempt to add the separator string
 * @method isList
 * @returns {boolean|*}
 */
StringBuilder.prototype.isList = function() {
    return this.shouldSeparate;
}

/**
 * Sets this string builder to add the separator string on each append()
 * @method setList
 * @param bool
 */
StringBuilder.prototype.setList = function(bool) {
    this.shouldSeparate = bool;
}

/**
 * Sets the separator used when appending strings, if enabled
 * @param str
 */
StringBuilder.prototype.setSeparator = function(str) {
    this.separator = str;
}


/**
 * Generate a random string - Sourced from CaffGeek on Stackoverflow.com
 * @param length
 * @param chars the characters to use in the random string(optional)
 * @returns {String} a randomly generated string
 */
exports.randomString = function(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

/**
 * Symbolize & condense a DynamoDB response object
 * @param data an AWS Response Object from DynamoDB
 * @returns {Object} the response, condensed into the following format:
 *     {
           tableName: {
               key1: value1
               key2: value2
               keyN: valueN
           },
           otherTable: { ... }
       }
 */
exports.symbolizeDynDBResponse = function(data) {
    var out = {};
    for (thisTable in data.Responses) {
        var newObj = {}
        for (i in data.Responses[thisTable]) {
            var thisResp = data.Responses[tableName][i];
            for (fieldName in thisResp) {
                var thisField = thisResp[fieldName];
                if (thisField.N != undefined) newObj[fieldName] = parseInt(thisField.N);
                if (thisField.S != undefined) newObj[fieldName] = thisField.S;
                if (thisField.B != undefined) newObj[fieldName] = new Buffer(thisField.B, "base64");
                if (thisfield.SS != undefined) newObj[fieldName] = thisField.SS;
                if (thisField.NS != undefined) {
                    newObj[fieldName] = [];
                    for (entryNum in thisField.NS) newObj[fieldName].push(parseInt(thisField.N[entrtyNum]));
                }
                if (thisField.BS != undefined) {
                    newObj[fieldName] = [];
                    for (entryNum in thisField.BS) newObj[fieldName].push(new Buffer(thisField.BS[entryNum], "base64"));
                }
            }
        }
        out[thisTable] = newObj;
    }
    return out;
}

/**
 * Pick a random int between the params (inclusive)
 * @param lowerBound
 * @param upperBound
 * @returns {Number}
 */
exports.randomInt = function(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound-lowerBound+1) + lowerBound);
}