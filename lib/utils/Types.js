"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var toString = Object.prototype.toString;
var TYPE_PREFIX = "[object ";
var NATIVE_TYPES = {
    "[object Number]": Number,
    "[object Boolean]": Boolean,
    "[object Array]": Array,
    "[object String]": String,
    "[object Date]": Date,
    "[object RegExp]": RegExp,
    "[object Null]": "Null",
    "[object Function]": Function,
    "[object Undefined]": "Undefined",
    "[object FormData]": FormData,
    "[object File]": File
};

var returnSameFunction = function returnSameFunction(o) {
    return o;
};

var CLONE_FUNCTIONS = {
    Null: returnSameFunction,
    Undefined: returnSameFunction,
    String: function (_String) {
        function String(_x) {
            return _String.apply(this, arguments);
        }

        String.toString = function () {
            return _String.toString();
        };

        return String;
    }(function (o) {
        return String(o);
    }),
    Boolean: returnSameFunction,
    Date: function (_Date) {
        function Date(_x2) {
            return _Date.apply(this, arguments);
        }

        Date.toString = function () {
            return _Date.toString();
        };

        return Date;
    }(function (o) {
        return new Date(o.getTime());
    }),
    Number: function (_Number) {
        function Number(_x3) {
            return _Number.apply(this, arguments);
        }

        Number.toString = function () {
            return _Number.toString();
        };

        return Number;
    }(function (o) {
        return Number(o);
    }),
    Function: returnSameFunction,
    RegExp: function (_RegExp) {
        function RegExp(_x4) {
            return _RegExp.apply(this, arguments);
        }

        RegExp.toString = function () {
            return _RegExp.toString();
        };

        return RegExp;
    }(function (o) {
        return new RegExp(o);
    }),
    File: returnSameFunction,
    FormData: returnSameFunction
};

var Types = function () {
    function Types() {
        _classCallCheck(this, Types);
    }

    _createClass(Types, null, [{
        key: "getTypeName",
        value: function getTypeName(obj) {
            var typeString = toString.call(obj);
            var type = NATIVE_TYPES[typeString];
            if (type) {
                return typeof type === "string" ? type : type.name;
            }
            return typeString.substring(TYPE_PREFIX.length, typeString.length - 1);
        }
    }, {
        key: "getCloneFunction",
        value: function getCloneFunction(typeName) {
            var cloner = CLONE_FUNCTIONS[typeName];
            if (!cloner) cloner = CLONE_FUNCTIONS[typeName];
            return cloner;
        }
    }, {
        key: "getType",
        value: function getType(obj) {
            var typeString = toString.call(obj);
            return NATIVE_TYPES[typeString];
        }
    }]);

    return Types;
}();

exports.default = Types;