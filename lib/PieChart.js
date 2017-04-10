"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ResizeComponent = require("./ResizeComponent");

var _ResizeComponent2 = _interopRequireDefault(_ResizeComponent);

var _Legend = require("./Legend");

var _Legend2 = _interopRequireDefault(_Legend);

require("./PieChart.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieChart = function (_Component) {
    _inherits(PieChart, _Component);

    function PieChart(props) {
        _classCallCheck(this, PieChart);

        var _this = _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).call(this, props));

        _this.legends = [];

        _this.__onResize = function (_ref) {
            var width = _ref.width,
                height = _ref.height;

            var scale = Math.max(width, _this.props.minSize) / _this.props.size;
            var margin = 100 - scale * 100;
            _this.setState({
                scale: scale <= 1 ? scale : 1,
                marginTop: margin > 0 ? -1 * (_this.props.size / 100 + 0.5) * margin : 0
            });
        };

        _this.__renderPies = function (data, percentage, rotation, depth, depthIndex) {
            if (!data || data.length <= 0) return [];

            var piesArr = [],
                sumValues = _this.__sumValues(data),
                mRotation = rotation;

            var c = 2 * depth + 1;
            var mRadius = (_this.props.size - 1) / 2 / c * (c - depthIndex);

            data.map(function (item, key) {
                var mPercentage = percentage * item.value / sumValues;
                piesArr.push.apply(piesArr, this.__renderPies(item.children, mPercentage, mRotation, depth, depthIndex - 1));
                mRotation += mPercentage;
            }.bind(_this));

            piesArr.push.apply(piesArr, _this.__createPath(data, mRadius, percentage, rotation, depth, depthIndex));
            return piesArr;
        };

        _this.__createPath = function (data, radius, percentage, rotaion, depth, depthIndex) {
            var sectors = [],
                mRadius = radius,
                origin = _this.props.size / 2,
                mRotation = rotaion,
                max = _this.__sumValues(data);

            data.map(function (item, key) {
                var value = item.value,
                    mPercentage = percentage * value / max,
                    isCircle = max === value,
                    aCalc = mPercentage > 180 ? 360 - mPercentage : mPercentage,
                    aRad = aCalc * Math.PI / 180,
                    z = Math.sqrt(2 * mRadius * mRadius - 2 * mRadius * mRadius * Math.cos(aRad)),
                    x = aCalc <= 90 ? mRadius * Math.sin(aRad) : mRadius * Math.sin((180 - aCalc) * Math.PI / 180),
                    y = Math.sqrt(z * z - x * x),
                    Y = origin - mRadius + y,
                    X = mPercentage <= 180 ? origin + x : origin - x,
                    arcSweep = mPercentage <= 180 ? 0 : 1,
                    V = origin - mRadius,
                    fill = item.fill || this.__randColor(key + z),
                    tooltip = item.label + "  " + value + " " + (item.unit || "") + "\n" + " " + ((mPercentage * 100 / 360).toFixed(2) + " %"),
                    cursor = "default";

                item.fill = fill;
                if (depthIndex === depth - 1) {
                    this.legends[item.key || item.label] = { fill: fill, label: item.label };
                    cursor = "pointer";
                }
                if (isCircle) sectors.push(_react2.default.createElement("circle", {
                    key: item.key + key + mPercentage,
                    id: item.key,
                    fill: fill,
                    cx: origin,
                    cy: origin,
                    r: radius,
                    data: tooltip,
                    onMouseOver: this.__showTooltip,
                    onMouseOut: this.__hideTooltip,
                    onMouseMove: this.__moveTooltip,
                    onClick: this.__onClick.bind(undefined, item) }));else {
                    sectors.push(_react2.default.createElement(
                        "path",
                        {
                            key: item.key + key + mPercentage,
                            id: item.key,
                            transform: 'rotate(' + mRotation + ', ' + origin + ', ' + origin + ')',
                            d: 'M ' + origin + ' ' + origin + ' V ' + V + ' A ' + mRadius + ' ' + mRadius + ' 1 ' + arcSweep + ' 1 ' + X + '  ' + Y + " z",
                            fill: fill,
                            data: tooltip,
                            style: { cursor: cursor },
                            onClick: this.__onClick.bind(undefined, item) },
                        _react2.default.createElement("animateTransform", {
                            attributeName: "transform",
                            type: "rotate",
                            from: 0 + ', ' + origin + ', ' + origin,
                            to: mRotation + ', ' + origin + ', ' + origin,
                            dur: "1s",
                            fill: "freeze"
                        })
                    ));
                }
                mRotation = mRotation + mPercentage;
            }.bind(_this));
            return sectors;
        };

        _this.__onClick = function (data) {
            var arr = [];
            arr.push(data);
            var depth = _this.__depthTree(arr);
            if (depth > 1) {
                _this.setState({data: arr, clicked: true});
            }
        };

        _this.__onClickReset = function () {
            _this.setState({data: _this.props.data, clicked: false});
        };

        _this.__depthTree = function (data) {
            if (!data || data.length <= 0) {
                return 0;
            }
            var depth = 0;
            for (var i = 0; i < data.length; i++) {
                depth = Math.max(depth, _this.__depthTree(data[i].children));
            }
            return 1 + depth;
        };

        _this.__sumValues = function (data) {
            var max = 0;
            data.map(function (item, key) {
                var value = item.value;
                max += value;
            });
            return max;
        };

        _this.__randColor = function (index) {
            var colors = ["#F44336", "#2196F3", "#E91E63", "#00BCD4", "#673AB7", "#009688", "#3F51B5", "#4CAF50", "#FF9800", "#FF5722", "#FFC107"];
            if (index !== undefined) {
                return colors[parseInt(Math.abs(index % colors.length)) % colors.length];
            }
            return colors[Math.floor(Math.random() * (colors.length - 1))];
        };

        _this.state = {
            scale: 1,
            marginTop: 0,
            data: _this.props.data,
            clicked: false
        };
        return _this;
    }

    _createClass(PieChart, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({data: nextProps.data});
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.state.data;
            var depth = this.__depthTree(data);
            this.legends = [];

            var c = 2 * depth + 1;
            var mRadius = (this.props.size - 1) / 2 / c * (c - depth - 1);

            var root = depth > 1 ? _react2.default.createElement("circle", {
                    fill: "white",
                    cx: this.props.size / 2,
                    cy: this.props.size / 2,
                    r: mRadius
                }) : undefined;

            var label = this.props.label === undefined ? undefined : _react2.default.createElement(
                    "h3",
                    {className: "rb-pie-chart-label"},
                    this.props.label
                );

            return _react2.default.createElement(
                _ResizeComponent2.default,
                {
                    style: {
                        transform: "scale(" + this.state.scale + ")",
                        transformOrigin: "bottom left",
                        marginTop: this.state.marginTop
                    },
                    onResize: this.__onResize
                },
                label,
                _react2.default.createElement(
                    "div",
                    {className: "rb-pie-chart", style: {width: this.props.size, height: this.props.size}},
                    _react2.default.createElement(
                        "svg",
                        {className: "rb-pie-chart-svg"},
                        this.__renderPies(data, 360, 0, depth, depth - 1),
                        root
                    ),
                    _react2.default.createElement(
                        "div",
                        {
                            className: "rb-pie-chart-back-tool",
                            style: {display: this.state.clicked ? "inherit" : "none"}
                        },
                        _react2.default.createElement(
                            "a",
                            {onClick: this.__onClickReset},
                            "reset"
                        )
                    ),
                    _react2.default.createElement(_Legend2.default, {
                        data: this.legends, width: this.props.legendWidth || this.props.size,
                        style: {marginLeft: 0}
                    })
                )
            );
        }
    }]);

    return PieChart;
}(_react.Component);

PieChart.propTypes = {
    /**
     * Label for the form control.
     */
    label: _react2.default.PropTypes.any,
    /**
     * Data to be plotted on the chart
     */
    data: _react2.default.PropTypes.array,
    /**
     * Size of chart as px
     */
    size: _react2.default.PropTypes.number,
    /**
     * Min width for chart as px
     */
    minSize: _react2.default.PropTypes.number,
    /**
     *
     */
    legendWidth: _react2.default.PropTypes.number
};
PieChart.defaultProps = {
    size: 400,
    minSize: 150,
    data: []
};
exports.default = PieChart;