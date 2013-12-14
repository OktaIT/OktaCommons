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
    if(this.separator != undefined && this.shouldSeparate) str += this.separator;
    this.shouldSeparate = true;
    this.str += str;
}

/**
 * Returns the string we are building
 * @returns {string}
 */
StringBuilder.prototype.toString = function() { return this.str; }

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