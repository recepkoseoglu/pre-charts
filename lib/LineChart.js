"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./LineChart.css");

var _Arrays = require("./utils/Arrays");

var _Arrays2 = _interopRequireDefault(_Arrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = function (_Component) {
    _inherits(LineChart, _Component);

    function LineChart(props) {
        _classCallCheck(this, LineChart);

        var _this = _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this, props));

        _this.legends = [];

        _this.__renderLines = function (data, meta) {
            var metaArr = [];
            var xAxisWidth = _this.__xAxisWidth();
            var sumXAxisWidth = 0;

            for (var i = 0; i < data.length - 1; i++) {
                var item = data[i];
                var itemArr = [];
                var nexItem = void 0;

                if (data[i + 1]) {
                    nexItem = data[i + 1];
                }

                var fields = _this.__getFields(item);

                for (var j in fields) {

                    var key = fields[j].key,
                        value = fields[j].value,
                        nexValue = value;

                    if (nexItem) {
                        nexValue = nexItem[key];
                    }

                    var properties = _Arrays2.default.getValueByKey(meta, "dataKey", key);
                    properties = properties === undefined ? {} : properties;

                    var tooltip = item.name + "\n" + (properties.name || key) + " : " + value + " " + (properties.unit || "") + "\n",
                        tooltipNext = nexItem.name + "\n" + (properties.name || key) + " : " + nexValue + " " + (properties.unit || "") + "\n";

                    var fill = properties.fill || _this.__randColor(j);

                    _this.legends[properties.name || key] = {fill: fill, label: properties.name || key};

                    var pointY = _this.__pointY(value),
                        nextPointY = _this.__pointY(nexValue),
                        x1 = sumXAxisWidth,
                        y1 = pointY,
                        x2 = sumXAxisWidth + xAxisWidth,
                        y2 = nextPointY;

                    itemArr.push(_react2.default.createElement("line", {
                        key: key,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2,
                        data: tooltip + tooltipNext,
                        onMouseOver: _this.__showTooltip,
                        onMouseOut: _this.__hideTooltip,
                        onMouseMove: _this.__moveTooltip,
                        strokeLinecap: "round",
                        stroke: fill,
                        strokeWidth: "4" }));
                }

                sumXAxisWidth += xAxisWidth;

                metaArr.push(_react2.default.createElement(
                    "g",
                    { key: i },
                    itemArr
                ));
            }
            return metaArr;
        };

        _this.__renderYAxis = function () {
            var maxYAxis = _this.__maxYAxis();
            var height = _this.props.height / 4;
            var axisArr = [];
            for (var i = 0; i < 4; i++) {
                axisArr.push(_react2.default.createElement("div", { key: i,
                    id: parseInt(maxYAxis / 4 * (4 - i)),
                    className: "rb-line-y-axis",
                    style: { height: height } }));
            }
            return axisArr;
        };

        _this.__renderXAxis = function () {
            var data = _this.props.data;
            var width = _this.__xAxisWidth();
            var axisArr = [];
            for (var i = 0; i < data.length - 1; i++) {
                var item = data[i],
                    nextItem = data[i + 1] || {};
                axisArr.push(_react2.default.createElement("div", { key: i,
                    className: "rb-line-x-axis",
                    data: item.name,
                    name: nextItem.name,
                    style: { width: width } }));
            }
            return axisArr;
        };

        _this.__maxYAxis = function () {
            var data = _this.props.data;
            var maxYAxis = 0;
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
            return (_this.props.width - 1) / (_this.props.data.length - 1);
        };

        _this.__pointY = function (value) {
            var maxYAxis = _this.__maxYAxis();
            return _this.props.height * (value * 100 / maxYAxis) / 100;
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
            var fill = e.target.getAttribute("stroke");

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

    _createClass(LineChart, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                {id: "line", style: {marginLeft: 40}},
                _react2.default.createElement(
                    "div",
                    {className: "rb-line-chart", style: {width: this.props.width, height: this.props.height}},
                    _react2.default.createElement(
                        "svg",
                        {className: "rb-line-chart-svg"},
                        this.__renderLines(this.props.data, this.props.meta)
                    ),
                    _react2.default.createElement(
                        "div",
                        {className: "tooltip", id: "tooltip"},
                        "Tooltip"
                    ),
                    _react2.default.createElement(
                        "div",
                        {className: "rb-line-chart-axis"},
                        this.__renderYAxis()
                    ),
                    _react2.default.createElement(
                        "div",
                        {className: "rb-line-chart-axis"},
                        this.__renderXAxis()
                    )
                )
            );
        }
    }]);

    return LineChart;
}(_react.Component);

LineChart.propTypes = {
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
LineChart.defaultProps = {
    width: 500,
    height: 300,
    data: [],
    meta: []
};
exports.default = LineChart;