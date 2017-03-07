"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assertions = require("./Assertions");

var _Assertions2 = _interopRequireDefault(_Assertions);

var _Types = require("./Types");

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

/**
 * A singleton class which implements mostly used json object operations.
 *
 * @class Objects
 */

var Objects = function () {
    function Objects() {
        _classCallCheck(this, Objects);
    }

    _createClass(Objects, null, [{
        key: "equals",


        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
         *
         * @description Checks equal the string value of the given source  and  the string value of the given destination object( dest )
         *
         * @param {any} src Source object to compare the equality
         * @param {any} dest Destination object to compare the equality
         * @returns : {boolean} if the string value of the given source equals the string value of the given destination then "true" else "false"
         */
        value: function equals(src, dest) {
            return JSON.stringify(src) === JSON.stringify(dest);
        }

        /**
         * @description Checks the given source object (any ) and  the given destination object (any)
         *
         * @param {any} src Source object to compare the equality
         * @param {any} dest Destination object to compare the equality
         * @returns : {boolean} if the string value of the given source equals the string value of the given destination then "true" else "false"
         */

    }, {
        key: "deepEqual",
        value: function deepEqual(src, dest) {
            if (!src) return src === dest;
            var type1 = toString.call(src);
            var type2 = toString.call(dest);
            if (type1 !== type2) return false;
            var result = true;
            switch (type1) {
                case "[object Object]":
                    {
                        var size = 0;
                        for (var key in src) {
                            if (hasOwnProperty.call(src, key)) {
                                if (!hasOwnProperty.call(src, key)) {
                                    result = false;
                                    break;
                                }
                                result = result && Objects.deepEqual(src[key], dest[key]);
                                size += 1;
                            }
                        }
                        if (size === 0) {
                            for (var _key in dest) {
                                if (hasOwnProperty.call(dest, _key)) {
                                    result = false;
                                    break;
                                }
                            }
                        }
                        break;
                    }
                case "[object Array]":
                    {
                        if (src.length !== dest.length) return false;
                        for (var i = 0; i < src.length; i++) {
                            result = result && Objects.deepEqual(src[i], src[i]);
                        }
                        break;
                    }
                default:
                    result = src === dest;
            }
            return result;
        }
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
         *
         * @description creates and returns clone of the given source object ( src )
         *
         * @param src the given source object
         * @returns the clonse of the given source object
         */

    }, {
        key: "deepCopy",
        value: function deepCopy(src) {
            return JSON.parse(JSON.stringify(src));
        }

        /* Returns the approximate memory usage, in bytes, of the specified object. The
         * parameter is:
         * object - the object whose size should be determined
         */

    }, {
        key: "sizeOf",
        value: function sizeOf(object) {
            // initialise the list of objects and size
            var size = 0;
            // loop over the objects
            switch (typeof object === "undefined" ? "undefined" : _typeof(object)) {
                // the object is a boolean
                case "boolean":
                    size += 4;
                    break;
                // the object is a number
                case "number":
                    size += 8;
                    break;
                // the object is a string
                case "string":
                    size += 2 * object.length;
                    break;
                // the object is a generic object
                case "object":
                    // if the object is not an array, add the sizes of the keys
                    if (toString.call(object) !== "[object Array]") {
                        for (var key in object) {
                            if (hasOwnProperty.call(object, key)) {
                                size += 2 * key.length;
                                size += Objects.sizeOf(object[key]);
                            }
                        }
                    } else {
                        // array objects
                        for (var i = 0; i < object.length; i += 1) {
                            size += Objects.sizeOf(object[i]);
                        }
                    }
                    break;
                default:
            }
            // return the calculated size
            return size;
        }

        /**
         *
         * @param object
         * @param key
         * @returns {boolean}
         */

    }, {
        key: "getTypeName",
        value: function getTypeName(object) {
            return _Types2.default.getTypeName(object);
        }

        /**
         *
         * @param object
         * @param key
         * @returns {boolean}
         */

    }, {
        key: "hasProperty",
        value: function hasProperty(object, key) {
            return hasOwnProperty.call(object, key);
        }

        /**
         *
         * @param src
         * @param dest
         * @param references
         * @param cloneNativeTypes
         * @returns {Object}
         */

    }, {
        key: "mergeClone",
        value: function mergeClone(src, dest, references, cloneNativeTypes) {
            if (src == null) return dest;
            if (dest == null) return Objects.clone(src, references, cloneNativeTypes);
            for (var key in src) {
                if (Objects.hasProperty(src, key)) {
                    var destProp = dest[key];
                    destProp = destProp ? Objects.mergeClone(src[key], destProp[key], references, cloneNativeTypes) : Objects.clone(src[key], references, cloneNativeTypes);
                    dest[key] = destProp;
                }
            }
            return dest;
        }

        /**
         * @param array
         * @param cloneNativeTypes
         * @param references
         * @returns {Array}
         */

    }, {
        key: "cloneArray",
        value: function cloneArray(array, references, cloneNativeTypes) {
            var destination = [];
            for (var i = 0; i < array.length; i += 1) {
                /* eslint-disable no-underscore-dangle */
                destination[i] = Objects.__clone(array[i], references, cloneNativeTypes);
            }
            return destination;
        }

        /**
         *
         * @param object
         * @param references
         * @param cloneNativeTypes
         * @returns {*}
         */

    }, {
        key: "cloneObject",
        value: function cloneObject(object, references, cloneNativeTypes) {
            // React Component then return
            if (_Assertions2.default.isReactComponent(object)) {
                return object;
            }
            // DOM Element
            if (object.nodeType && Objects.getTypeName(object.cloneNode) === "Function") {
                return object;
            }
            var destination = {};
            for (var key in object) {
                if (hasOwnProperty.call(object, key)) {
                    destination[key] = Objects.__clone(object[key], references, cloneNativeTypes);
                }
            }
            return destination;
        }

        /**
         *
         * @param src
         * @param references
         * @param cloneNativeTypes
         * @returns {Object}
         */

    }, {
        key: "clone",
        value: function clone(src, references, cloneNativeTypes) {
            /* eslint-disable no-underscore-dangle */
            return Objects.__clone(src, references, cloneNativeTypes);
        }

        /**
         * @param src
         * @param cloneNativeTypes
         * @param references
         * @returns {*}
         * @private
         */

    }, {
        key: "__clone",
        value: function __clone(src, references, cloneNativeTypes) {
            /* eslint-disable no-underscore-dangle */
            var objectType = Objects.getTypeName(src);

            var cloneFunction = _Types2.default.getCloneFunction(objectType);
            if (cloneFunction) {
                // its native type
                return cloneNativeTypes === true ? cloneFunction(src) : src;
            }

            if (references) {
                for (var i = 0; i < references.length; i += 1) {
                    if (typeof references[i] === "function" && src instanceof references[i]) {
                        return src;
                    }
                }
            }
            switch (objectType) {
                case "Array":
                    return Objects.cloneArray(src, references, cloneNativeTypes);
                case "Object":
                    return Objects.cloneObject(src, references, cloneNativeTypes);
                default:
                    return src;
            }
        }
    }]);

    return Objects;
}();

exports.default = Objects;