"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-line import/extensions


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _isJs = require("is-js");

var _isJs2 = _interopRequireDefault(_isJs);

var _Objects = require("./Objects");

var _Objects2 = _interopRequireDefault(_Objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var checkerObject = {};

var Assertions = function () {
    function Assertions() {
        _classCallCheck(this, Assertions);
    }

    _createClass(Assertions, null, [{
        key: "isUrl",


        /**
         * Checks if the string is a valid URL.
         * @param {String} url string to check.
         * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
         * @returns {boolean} "true": is url , "false": is not url.
         * @throws exception if error is true and url provided is not valid.
         */
        value: function isUrl(url, error) {
            if (!Assertions.urlPattern.test(url)) {
                if (error) {
                    throw new Error("Given url is not valid ! URL :" + url);
                }
                return false;
            }
            return true;
        }

        /**
         * Checks is Empty or not
         * @param {any} object to check
         * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
         * @returns {boolean} "true": is not empty , "false": is empty.
         * @throws exception if error is true and object provided is  empty.
         */


        /**
         * url pattern explaining
         * "^(https?:\/\/)?"+ // protocol
         * "((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|"+ // domain name
         * "((\d{1,3}\.){3}\d{1,3}))"+ // OR ip (v4) address
         * "(\:\d+)?(\/[-a-z\d%_.~+]*)*"+ // port and path
         * "(\?[;&a-z\d%_.~+=-]*)?"+ // query string
         * "(\#[-a-z\d_]*)?$","i"); // fragment locater
         *
         * check if the string is url then
         * @type {RegExp}
         */

    }, {
        key: "isNotEmpty",
        value: function isNotEmpty(arg, error) {
            if (_isJs2.default.empty(arg)) {
                if (error) {
                    throw new Error("Given argument is empty or null !");
                }
                return false;
            }
            return true;
        }

        /**
         * Checks is not undefined
         * @param {any} object to check
         * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
         * @returns {boolean} "true": is not undefined , "false": is undefined.
         * @throws exception if error is true and object provided is  undefined.
         */

    }, {
        key: "isNotUndefined",
        value: function isNotUndefined(arg, error) {
            if (arg === undefined) {
                if (error) {
                    throw new Error("Given argument is undefined !");
                }
                return false;
            }
            return true;
        }

        /**
         * Checks is not undefined or null
         * @param {any} object to check
         * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
         * @returns {boolean} "true": is not undefined and null , "false": is undefined or null.
         * @throws exception if error is true and object provided is  undefined or null.
         */

    }, {
        key: "isNotUndefinedAndNull",
        value: function isNotUndefinedAndNull(arg, error) {
            if (arg === undefined) {
                if (error) {
                    throw new Error("Given argument is undefined !");
                }
                return false;
            }
            if (arg === null) {
                if (error) {
                    throw new Error("Given argument is null !");
                }
                return false;
            }
            return true;
        }

        /**
         * Checks the func is Function
         * @param func
         * @param error
         * @returns {boolean}
         */

    }, {
        key: "isFunction",
        value: function isFunction(func, error) {
            if (Assertions.isNotUndefined(func, error)) {
                var isFunc = _Objects2.default.getTypeName(func) === "Function";
                if (!isFunc) {
                    if (error) {
                        throw new Error("Given argument is not a function !");
                    }
                    return false;
                }
                return true;
            }
            return false;
        }

        /**
         * Checks func is not Anonymous function ( if function has no name then it is anonymous)
         * @param func
         * @param error
         * @returns {boolean}
         */

    }, {
        key: "isNotAnonymous",
        value: function isNotAnonymous(func, error) {
            if (Assertions.isFunction(func, error)) {
                if (!Assertions.isNotEmpty(func.name, false)) {
                    if (error) {
                        throw new Error("Given argument is a anonymous function !");
                    }
                    return false;
                }
                return true;
            }
            return false;
        }

        /**
         * Checks obj is Object
         * @param obj
         * @param error
         * @returns {boolean}
         */

    }, {
        key: "isObject",
        value: function isObject(obj, error) {
            if (!_isJs2.default.object(obj)) {
                if (error) {
                    throw new Error("Given format is not valid object !");
                }
                return false;
            }
            return true;
        }

        /**
         * Checks is json or not
         * @param obj
         * @param error
         * @returns {boolean}
         */

    }, {
        key: "isJson",
        value: function isJson(obj, error) {
            if (!_isJs2.default.object(obj)) {
                if (error) {
                    throw new Error("Given format is not valid json format !");
                }
                return false;
            }
            return true;
        }

        /**
         * Checks is integer or not
         * @param n
         * @param error
         * @returns {boolean}
         */

    }, {
        key: "isInteger",
        value: function isInteger(n, error) {
            /* eslint-disable eqeqeq */
            if (!(Number(n) == n && n % 1 === 0)) {
                if (error) {
                    throw new Error("Given argument is not a integer !");
                }
                return false;
            }
            return true;
        }

        /**
        * Checks is string or not
        * @param obj
        * @param error
        * @returns {boolean}
        */

    }, {
        key: "isString",
        value: function isString(obj, error) {
            if (!_isJs2.default.string(obj)) {
                if (error) {
                    throw new Error("Given format is not valid string !");
                }
                return false;
            }
            return true;
        }

        /**
        * Checks is array or not
        * @param obj
        * @param error
        * @returns {boolean}
        */

    }, {
        key: "isArray",
        value: function isArray(obj, error) {
            if (!_isJs2.default.array(obj)) {
                if (error) {
                    throw new Error("Given format is not valid array !");
                }
                return false;
            }
            return true;
        }

        /**
         * Checks is Map Object or not
         * @param obj
         * @param error
         * @returns {boolean}
         */

    }, {
        key: "isReactComponent",


        /**
         * Checks instance is React Component or not.
         * @param {Object} instance
         * @param {boolean} error
         * @returns {boolean}
         */
        value: function isReactComponent(instance, error) {
            /* disable-eslint no-underscore-dangle */
            if (!(instance && instance.$$typeof)) {
                if (error) {
                    throw new Error("Given component is not a react component ! Component :" + instance);
                }
                return false;
            }
            return true;
        }
        /**
         * Checks Class is extended from React.Component or not.
         * @param {Object} instance
         * @param {boolean} error
         * @returns {boolean}
         */

    }, {
        key: "isReactComponentClass",
        value: function isReactComponentClass(clazz, error) {
            if (!checkerObject.isPrototypeOf.call(_react2.default.Component, clazz)) {
                if (error) {
                    throw new Error("Given component class is not a React.Component !");
                }
                return false;
            }
            return true;
        }

        /**
         * Checks given value type is Number, Boolean, Array, String, Date, RegExp, Null, Function, Undefined
         * @param obj
         * @param error
         * @returns {boolean}
         */

    }, {
        key: "isKnownType",
        value: function isKnownType(obj, error) {
            switch (_Objects2.default.getTypeName(obj)) {
                case "Number":
                case "Boolean":
                case "Array":
                case "String":
                case "Date":
                case "RegExp":
                case "Null":
                case "Function":
                case "Undefined":
                case "FormData":
                case "File":
                    return true;
                default:
                    if (error) {
                        throw new Error("Given object is unknown ! Object:  " + obj);
                    }
                    return false;

            }
        }
    }]);

    return Assertions;
}();

Assertions.urlPattern = /^(([a-z]+:\/+)([^/\s]*)([a-z0-9\-@^=%&;/~+]*)[?]?([^ #]*)#?([^ #]*))|((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/;

Assertions.isMap = function (obj, error) {
    var result = true;
    if (_isJs2.default.hash(obj)) {
        for (var key in obj) {
            if (Assertions.isFunction(obj[key])) {
                result = false;
                break;
            } else if (_isJs2.default.hash(obj[key])) {
                result = Assertions.isMap(obj[key]);
                if (!result) {
                    break;
                }
            }
        }
    } else {
        result = false;
    }
    if (result && error) {
        throw new Error("Given format is not valid hash map !");
    }
    return result;
};

exports.default = Assertions;