"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./BarChart.css");

var _Arrays = require("./utils/Arrays");

var _Arrays2 = _interopRequireDefault(_Arrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = function (_Component) {
    _inherits(BarChart, _Component);

    function BarChart(props) {
        _classCallCheck(this, BarChart);

        var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));

        _this.legends = [];

        _this.__renderBars = function (data, meta) {
            var metaArr = [];
            var xAxisWidth = _this.__xAxisWidth();
            var sumXAxisWidth = 0;

            for (var i in data) {
                var item = data[i];
                var itemArr = [];

                var barWidth = _this.__barWidth(item);
                var fields = _this.__getFields(item);
                var pointX = sumXAxisWidth + (xAxisWidth - barWidth * fields.length) / 2;
                sumXAxisWidth += xAxisWidth;

                for (var j in fields) {
                    var key = fields[j].key,
                        value = fields[j].value;

                    var properties = _Arrays2.default.getValueByKey(meta, "dataKey", key);
                    properties = properties === undefined ? {} : properties;

                    var tooltip = item.name + "\n" + (properties.name || key) + " : " + value + " " + (properties.unit || "") + "\n";
                    var fill = properties.fill || _this.__randColor(j);

                    var barHeight = _this.__barHeight(value);
                    _this.legends[properties.name || key] = {fill: fill, label: properties.name || key};

                    itemArr.push(_react2.default.createElement("rect", {
                        key: key,
                        id: key,
                        x: pointX,
                        y: 0,
                        width: barWidth,
                        height: barHeight,
                        data: tooltip,
                        onMouseOver: _this.__showTooltip,
                        onMouseOut: _this.__hideTooltip,
                        onMouseMove: _this.__moveTooltip,
                        fill: fill }));

                    pointX += barWidth;
                }
                metaArr.push(_react2.default.createElement(
                    "g",
                    { key: i, id: i },
                    itemArr
                ));
            }
            return metaArr;
        };

        _this.__renderYAxis = function () {
            var maxYAxis = _this.__maxYAxis();
            var axisArr = [];
            for (var i = 0; i < 4; i++) {
                axisArr.push(_react2.default.createElement("div", { key: i,
                    id: parseInt(maxYAxis / 4 * (4 - i)),
                    className: "rb-bar-y-axis",
                    style: {height: _this.props.height / 4}
                }));
            }
            return axisArr;
        };

        _this.__renderXAxis = function () {
            var data = _this.props.data,
                maxYAxis = _this.__xAxisWidth(),
                axisArr = [];
            for (var i = 0; i < data.length; i++) {
                axisArr.push(_react2.default.createElement("div", { key: i,
                    className: "rb-bar-x-axis",
                    name: data[i].name,
                    style: { width: maxYAxis } }));
            }
            return axisArr;
        };

        _this.__maxYAxis = function () {
            var data = _this.props.data,
                maxYAxis = 0;
            for (var i in data) {
                var fields = _this.__getFields(data[i]);
                for (var j in fields) {
                    if (fields[j].value > maxYAxis) maxYAxis = fields[j].value;
                }
            }
            var a = maxYAxis > 1000 ? 1000 : maxYAxis > 100 ? 100 : maxYAxis > 50 ? 50 : maxYAxis > 10 ? 10 : 1;

            return ~~((maxYAxis + a - 1) / a) * a;
        };

        _this.__xAxisWidth = function () {
            return (_this.props.width - 1) / _this.props.data.length;
        };

        _this.__barHeight = function (value) {
            var maxYAxis = _this.__maxYAxis();
            return _this.props.height * (value * 100 / maxYAxis) / 100;
        };

        _this.__barWidth = function (data) {
            var fields = _this.__getFields(data),
                minWidth = _this.__xAxisWidth() / fields.length;
            return minWidth < 30 ? minWidth : 30;
        };

        _this.__getFields = function (data) {
            var arr = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === "name" || key === "fill" || key === "unit") {
                        continue;
                    }
                    arr.push({
                        value: data[key],
                        key: key
                    });
                }
            }
            return arr;
        };

        _this.__showTooltip = function (e) {
            if (_this.tooltip === undefined) {
                _this.tooltip = document.getElementById("tooltip");
            }
            _this.tooltip.style.visibility = "visible";

            var tooltipText = e.target.getAttribute("data");
            var fill = e.target.getAttribute("fill");

            _this.tooltip.innerHTML = tooltipText;
            _this.tooltip.style.backgroundColor = fill;
        };

        _this.__hideTooltip = function (e) {
            if (_this.tooltip === undefined) _this.tooltip = document.getElementById("tooltip");
            _this.tooltip.style.visibility = "hidden";
        };

        _this.__moveTooltip = function (e) {
            if (_this.tooltip === undefined) _this.tooltip = document.getElementById("tooltip");

            _this.tooltip.style.left = e.clientX + 10 + "px";
            _this.tooltip.style.top = e.clientY + 10 + "px";
        };

        _this.__randColor = function (index) {
            var colors = ["#F44336", "#673AB7", "#2196F3", "#FF5722", "#9C27B0", "#FFC107", "#FF9800", "#4CAF50", "#00796B", "#009688", "#3F51B5"];
            if (index !== undefined) {
                return colors[index % colors.length];
            }
            return colors[Math.floor(Math.random() * (colors.length - 1))];
        };

        return _this;
    }

    _createClass(BarChart, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                {id: "bar", style: {marginLeft: 40, width: this.props.width}},
                _react2.default.createElement(
                    "div",
                    {
                        className: "rb-bar-chart",
                        style: {width: this.props.width, height: this.props.height}
                    },
                    _react2.default.createElement(
                        "svg",
                        {className: "rb-bar-chart-svg"},
                        this.__renderBars(this.props.data, this.props.meta)
                    ),
                    _react2.default.createElement("div", {className: "tooltip", id: "tooltip"}),
                    _react2.default.createElement(
                        "div",
                        {className: "rb-bar-chart-axis"},
                        this.__renderYAxis()
                    ),
                    _react2.default.createElement(
                        "div",
                        {className: "rb-bar-chart-axis"},
                        this.__renderXAxis()
                    )
                )
            );
        }
    }]);

    return BarChart;
}(_react.Component);

BarChart.propTypes = {
    /**
     * Width for chart as px
     */
    width: _react2.default.PropTypes.number,
    /**
     * Height for chart as px
     */
    height: _react2.default.PropTypes.number,
    /**
     * Data to be plotted on the chart
     */
    data: _react2.default.PropTypes.array,
    /**
     * Change to be made for the given data
     */
    meta: _react2.default.PropTypes.array
};
BarChart.defaultProps = {
    width: 500,
    height: 300,
    data: [],
    meta: []
};
exports.default = BarChart;