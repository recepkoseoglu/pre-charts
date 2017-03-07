"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Objects = require("./Objects");

var _Objects2 = _interopRequireDefault(_Objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var checkerObject = {};
/**
 * A singleton class which implements mostly used array operations.
 */

var Arrays = function () {
    function Arrays() {
        _classCallCheck(this, Arrays);
    }

    _createClass(Arrays, null, [{
        key: "remove",


        /**
         * Removes the given item from the given array.
         * @param {Array} source Source array for the remove operation. *This array will be modified at the end of the operation.*
         * @param {any} target Target to match.
         * @returns {boolean} "true": target removed , "false": target not found.
         */
        value: function remove(source, target) {
            for (var i = 0; i < source.length; i += 1) {
                if (source[i] === target) {
                    source.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        /**
         * Removes the item with target value from the given array. Checks arrayItem[key] === target removes if matches.
         * @param {Array} source Source array for the remove operation. This array will be modified at the end of the operation.
         * @param {string} key Key for checking array items.
         * @param {any} target Target to match.
         * @returns {boolean} "true": target removed , "false": target not found.
         */

    }, {
        key: "removeByKey",
        value: function removeByKey(source, key, target) {
            for (var i = 0; i < source.length; i += 1) {
                if (source[i][key] === target[key]) {
                    source.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        /**
         * Finds the index of the given target in the given array.
         * @param {Array} source Source array for the operation.
         * @param {any} target Target to match.
         * @returns {number} The index of the target. Returns "-1" in case of no match.
         */

    }, {
        key: "indexOf",
        value: function indexOf(source, target) {
            for (var i = 0; i < source.length; i += 1) {
                if (source[i] === target) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Finds the index of the item with target value from the given array. Checks arrayItem[key] === target returns index if matches.
         * @param {Array} source Source array for the operation.
         * @param {string} key Key for checking array items.
         * @param {any} target Target to match.
         * @returns {number} The index of the target. Returns "-1" in case of no match.
         */

    }, {
        key: "indexOfByKey",
        value: function indexOfByKey(source, key, target) {
            for (var i = 0; i < source.length; i += 1) {
                if (source[i][key] === target) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Returns the value of the item with the given key from the array. Checks arrayItem[key] === target returns value if matches.
         * @param {Array} source Source array for the operation.
         * @param {string} key Key for checking array items.
         * @param {any} target Target to match.
         * @returns {any} The item. Returns "undefined" in case of no match.
         */

    }, {
        key: "getValueByKey",
        value: function getValueByKey(source, key, target) {
            var index = Arrays.indexOfByKey(source, key, target);
            return index !== -1 ? source[index] : undefined;
        }

        /**
         * Checks if the value of the item with the given key from the array exists. Checks arrayItem[key] === target returns "true" if matches.
         * @param {Array} source Source array for the operation.
         * @param {string} key Key for checking array items.
         * @param {any} target Target to match.
         * @returns {boolean} If exists "true", else "false".
         */

    }, {
        key: "isExistByKey",
        value: function isExistByKey(source, key, target) {
            for (var i = 0; i < source.length; i += 1) {
                if (source[i][key] === target[key]) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Extracts an array from the given array. Collects all values with the given key from array items and returns as an array.
         * @param {Array} source Source array for the operation.
         * @param {string} key Key for checking array items.
         * @returns {Array} The resulting array with the values. Returns an empty array in case of no key match.
         */

    }, {
        key: "extractValueArray",
        value: function extractValueArray(source, key) {
            var array = [];
            for (var i = 0; i < source.length; i += 1) {
                if (checkerObject.hasOwnProperty.call(source[i], key)) {
                    array.push(source[i][key]);
                }
            }
            return array;
        }

        /**
         * Extracts an array from the given array. Collects all items with the given key,target match from array and returns as an array.
         * @param {Array} source Source array for the operation.
         * @param {string} key Key for checking array items.
         * @param {any} target Target to match.
         * @returns {Array} The resulting array of items matches. Returns an empty array in case of no key match.
         */

    }, {
        key: "extractItemArray",
        value: function extractItemArray(source, key, target) {
            var newArray = [];
            for (var i = 0; i < source.length; i += 1) {
                if (source[i][key] === target) {
                    newArray.push(source[i]);
                }
            }
            return newArray;
        }

        /**
         * Merges the given arrays.
         * Note: It used deepEqual to check equality.
         * @see Objects.deepEqual
         * @param {Array<Array<any>>} arrays
         * @return {Array<any>}
         */

    }, {
        key: "mergeArrays",
        value: function mergeArrays() {
            for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
                arrays[_key] = arguments[_key];
            }

            if (!arrays) return [];
            var resultArray = [];
            for (var i = 0; i < arrays.length; i++) {
                var array = arrays[i];
                if (array) {
                    for (var j = 0; j < array.length; j++) {
                        var isExist = false;
                        for (var t = 0; t < resultArray.length; t++) {
                            if (_Objects2.default.deepEqual(array[j], resultArray[t])) {
                                isExist = true;
                                break;
                            }
                        }
                        if (!isExist) {
                            resultArray.push(array[j]);
                        }
                    }
                }
            }
            return resultArray;
        }

        /**
         * Merges the given arrays.
         * Note: It used indexOf to check equality.
         * IndexOf can be success on accepted Native Types = [number, boolean, string, null, function, undefined]
         * @param {Array<Array<T>>} arrays
         * @return {Array<T>}
         */

    }, {
        key: "mergeArraysForNativeType",
        value: function mergeArraysForNativeType() {
            for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arrays[_key2] = arguments[_key2];
            }

            if (!arrays) return [];
            var resultArray = [];
            for (var i = 0; i < arrays.length; i++) {
                var array = arrays[i];
                if (array) {
                    for (var j = 0; j < array.length; j++) {
                        if (resultArray.indexOf(array[j]) === -1) {
                            resultArray.push(array[j]);
                        }
                    }
                }
            }
            return resultArray;
        }

        /**
         * Removes the given items from the given source array.
         * Note: It used deepEqual to check equality.
         * @see Objects.deepEqual
         * @param from
         * @param what
         * @return {*}
         */

    }, {
        key: "removeAll",
        value: function removeAll(from, what) {
            if (!from) return [];
            if (!what || what.length === 0) return from.slice(0);
            var newArray = [];
            for (var i = 0; i < from.length; i++) {
                var willRemove = false;
                for (var j = 0; j < what.length; j++) {
                    if (_Objects2.default.equals(from[i], what[j])) {
                        willRemove = true;
                        break;
                    }
                }
                if (!willRemove) {
                    newArray.push(from[i]);
                }
            }
            return newArray;
        }

        /**
         * Removes the given items from the given source array.
         * Note: It used indexOf to check equality.
         * IndexOf can be success on accepted Native Types = [number, boolean, string, null, function, undefined]
         * @param from
         * @param what
         * @return {any[]}
         */

    }, {
        key: "removeAllForNativeType",
        value: function removeAllForNativeType(from, what) {
            if (!from) return [];
            if (!what || what.length === 0) return from.slice(0);
            var newArray = [];
            for (var i = 0; i < from.length; i++) {
                var value = from[i];
                if (what.indexOf(value) === -1) {
                    newArray.push(from[i]);
                }
            }
            return newArray;
        }
    }]);

    return Arrays;
}();

exports.default = Arrays;