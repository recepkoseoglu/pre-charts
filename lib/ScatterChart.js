"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Arrays = require("./utils/Arrays");

var _Arrays2 = _interopRequireDefault(_Arrays);

require("./ScatterChart.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScatterChart = function (_Component) {
    _inherits(ScatterChart, _Component);

    function ScatterChart(props) {
        _classCallCheck(this, ScatterChart);

        var _this = _possibleConstructorReturn(this, (ScatterChart.__proto__ || Object.getPrototypeOf(ScatterChart)).call(this, props));

        _this.legends = [];

        _this.__renderScatters = function (data, meta) {
            var metaArr = [];
            for (var i in data) {
                var item = data[i];
                for (var j in item.data) {
                    var child = item.data[j],
                        cx = _this.__pointX(child.x),
                        cy = _this.__pointY(child.y),
                        fill = item.fill || _this.__randColor(i),
                        tooltip = item.name + "\n",
                        fields = _this.__getFields(item.data[j]);

                    for (var f in fields) {
                        var key = fields[f].key,
                            value = fields[f].value,
                            properties = _Arrays2.default.getValueByKey(meta, "dataKey", key);

                        properties = properties === undefined ? {} : properties;
                        tooltip += (properties.name || key) + " : " + value + " " + (properties.unit || "") + "\n";
                    }
                    _this.legends[i] = {fill: fill, label: item.name};
                    metaArr.push(_react2.default.createElement("circle", {
                        key: i + " " + j,
                        cx: cx,
                        cy: cy,
                        r: 8,
                        fill: fill,
                        data: tooltip,
                        onMouseOver: _this.__showTooltip,
                        onMouseOut: _this.__hideTooltip,
                        onMouseMove: _this.__moveTooltip
                    }));
                }
            }
            return metaArr;
        };

        _this.__renderYAxis = function () {
            var max = _this.__maxAxis();
            var height = _this.props.height / 4;
            var axisArr = [];
            for (var i = 0; i < 4; i++) {
                axisArr.push(_react2.default.createElement("div", { key: i,
                    id: parseInt(max.y / 4 * (4 - i)),
                    className: "rb-scatter-y-axis",
                    style: { height: height } }));
            }
            return axisArr;
        };

        _this.__renderXAxis = function () {
            var max = _this.__maxAxis();
            var width = (_this.props.width - 1) / 5;
            var axisArr = [];
            for (var i = 0; i < 5; i++) {
                axisArr.push(_react2.default.createElement("div", { key: i,
                    id: parseInt(max.x / 5 * (i + 1)),
                    className: "rb-scatter-x-axis",
                    style: { width: width } }));
            }
            return axisArr;
        };

        _this.__maxAxis = function () {
            var data = _this.props.data;
            var maxYAxis = 0;
            var maxXAxis = 0;
            for (var i in data) {
                var item = data[i];
                for (var j in item.data) {
                    var fields = _this.__getFields(item.data[j]);
                    for (var f in fields) {
                        if (fields[f].key === "x" && fields[f].value > maxXAxis) maxXAxis = fields[f].value;
                        if (fields[f].key === "y" && fields[f].value > maxYAxis) maxYAxis = fields[f].value;
                    }
                }
            }
            var x = maxXAxis > 1000 ? 1000 : maxXAxis > 100 ? 100 : maxXAxis > 40 ? 40 : maxXAxis > 10 ? 10 : 1;
            var y = maxYAxis > 1000 ? 1000 : maxYAxis > 100 ? 100 : maxYAxis > 50 ? 50 : maxYAxis > 10 ? 10 : 1;

            var max = {
                x: ~~((maxXAxis + x - 1) / x) * x,
                y: ~~((maxYAxis + y - 1) / y) * y
            };

            return max;
        };

        _this.__pointY = function (value) {
            var max = _this.__maxAxis();
            return _this.props.height - _this.props.height * (value * 100 / max.y) / 100;
        };

        _this.__pointX = function (value) {
            var max = _this.__maxAxis();
            return _this.props.width * (value * 100 / max.x) / 100;
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
            var colors = ["#F44336", "#FF9800", "#FF5722", "#9C27B0", "#673AB7", "#2196F3", "#FFC107", "#4CAF50", "#00796B", "#009688", "#3F51B5"];
            if (index !== undefined) {
                return colors[index % colors.length];
            }
            return colors[Math.floor(Math.random() * (colors.length - 1))];
        };

        return _this;
    }

    _createClass(ScatterChart, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                {style: {marginLeft: 40, marginBottom: 30}},
                _react2.default.createElement(
                    "div",
                    {className: "rb-scatter-chart", style: {width: this.props.width, height: this.props.height}},
                    _react2.default.createElement(
                        "svg",
                        {className: "rb-scatter-chart-svg"},
                        this.__renderScatters(this.props.data, this.props.meta)
                    ),
                    _react2.default.createElement("div", {className: "tooltip", id: "tooltip"}),
                    _react2.default.createElement(
                        "div",
                        {className: "rb-scatter-chart-axis"},
                        this.__renderYAxis()
                    ),
                    _react2.default.createElement(
                        "div",
                        {className: "rb-scatter-chart-axis"},
                        this.__renderXAxis()
                    )
                )
            );
        }
    }]);

    return ScatterChart;
}(_react.Component);

ScatterChart.propTypes = {
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
ScatterChart.defaultProps = {
    width: 500,
    height: 300,
    data: [],
    meta: []
};
exports.default = ScatterChart;