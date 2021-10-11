/*can-param@1.1.3#can-param*/
define([
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    var standardsMode = false;
    function buildParam(prefix, obj, add) {
        if (Array.isArray(obj)) {
            for (var i = 0, l = obj.length; i < l; ++i) {
                var inner = obj[i];
                var shouldIncludeIndex = typeof inner === 'object';
                var arrayIndex = shouldIncludeIndex ? '[' + i + ']' : '[]';
                buildParam(prefix + arrayIndex, inner, add);
            }
        } else if (obj && typeof obj === 'object') {
            for (var name in obj) {
                buildParam(prefix + '[' + name + ']', obj[name], add);
            }
        } else {
            add(prefix, obj);
        }
    }
    if (namespace.param) {
        throw new Error('You can\'t have two versions of can-param, check your dependencies');
    } else {
        module.exports = namespace.param = function param(object) {
            var pairs = [], add = function (key, value) {
                    value = standardsMode && value == null ? '' : value;
                    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                };
            for (var name in object) {
                if (!standardsMode || typeof object[name] !== 'undefined') {
                    buildParam(name, object[name], add);
                }
            }
            return pairs.join('&').replace(/%20/g, '+');
        };
        namespace.param.setStandardsMode = function (value) {
            standardsMode = !!value;
        };
    }
});