"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./Legend.css");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Legend = function (_Component) {
    _inherits(Legend, _Component);

    function Legend() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Legend);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Legend.__proto__ || Object.getPrototypeOf(Legend)).call.apply(_ref, [this].concat(args))), _this), _this.__renderLegend = function () {
            var legends = _this.props.data,
                arr = [];
            for (var key in legends) {
                if (legends.hasOwnProperty(key)) {
                    var lengend = legends[key];
                    arr.push(_react2.default.createElement(
                        "div",
                        {style: {borderColor: lengend.fill, color: lengend.fill}},
                        lengend.label
                    ));
                }
            }
            return arr;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Legend, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                {
                    className: this.props.className,
                    style: {width: this.props.width, marginTop: 20}
                },
                _react2.default.createElement(
                    "div",
                    {className: "rb-thumbnail-box"},
                    this.__renderLegend()
                )
            );
        }
    }]);

    return Legend;
}(_react.Component);

Legend.propTypes = {
    className: _react2.default.PropTypes.string,
    width: _react2.default.PropTypes.number,
    data: _react2.default.PropTypes.array
};
Legend.defaultProps = {
    width: 500,
    data: []
};
exports.default = Legend;