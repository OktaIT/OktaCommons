/**
 * Created by jjohnson on 12/13/13.
 */

exports.StringBuilder = StringBuilder;
exports.DynamoDBHelpers = require("./DynamoDBHelpers.js");

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
 * Pick a random int between the params (inclusive)
 * @param lowerBound
 * @param upperBound
 * @returns {Number}
 */
exports.randomInt = function(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound-lowerBound+1) + lowerBound);
}