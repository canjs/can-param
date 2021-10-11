"use strict";
var namespace = require("can-namespace");

var standardsMode = false;

function buildParam(prefix, obj, add) {
	if (Array.isArray(obj)) {
		for (var i = 0, l = obj.length; i < l; ++i) {
			var inner = obj[i];
			var shouldIncludeIndex = typeof inner === 'object';
			var arrayIndex = shouldIncludeIndex ? '[' + i + ']' : '[]';
			buildParam(prefix + arrayIndex, inner, add);
		}
	} else if ( obj && typeof obj === "object" ) {
		for (var name in obj) {
			buildParam(prefix + '[' + name + ']', obj[name], add);
		}
	} else {
		add(prefix, obj);
	}
}

if ( namespace.param ) {
	throw new Error( "You can't have two versions of can-param, check your dependencies" );
} else {
	module.exports = namespace.param = function param(object) {
		var pairs = [],
			add = function (key, value) {
				value = standardsMode && value == null ? '' : value;
				pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
			};
		for (var name in object) {
			if (!standardsMode || typeof object[name] !== 'undefined') {
				buildParam(name, object[name], add);
			}
		}
		return pairs.join('&')
			.replace(/%20/g, '+');
	};

	/**
	 * @function can-param.setStandardsMode setStandardsMode
	 * @parent can-param.methods
	 * @description Set whether to treat null and undefined specially when serializing
	 * 
	 * @signature `param.setStandardsMode(boolean)`
	 *
	 * Set whether to serialize values in a manner more consistent with jQuery[1] and URLSearchParams[2], or to use the classic
	 * can-param value serialization.  By default this value is false (classic mode).
	 *
	 * The differences between the two are:
	 * - `null` serializes to an empty string in standards mode, "null" in classic mode
	 * - `undefined` is removed from the serialized form entirely in standards mode, serialized to "undefined" in classic mode
	 *
	 * All other values are treated the same in both modes.
	 *
	 * @param  {boolean} value `true` to use DOM/jQuery style param serialization, `false` to use classic can-param serializtion
	 *
	 * @body
	 * <hr>
	 * [1] [https://api.jquery.com/jquery.param/]
   * 
	 * [2] [https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams]
	 */
	namespace.param.setStandardsMode = function (value) {
		standardsMode = !!value;
	};
}
