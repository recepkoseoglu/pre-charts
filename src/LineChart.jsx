import React, {Component} from "react";
import ResizeComponent from "./ResizeComponent";
import Legend from "./Legend";
import Arrays from "./utils/Arrays";
import "./LineChart.css";

export default class LineChart extends Component {

    static propTypes: Map = {
        /**
         * Label for the form control.
         */
        label: React.PropTypes.any,
        /**
         * Width for chart as px
         */
        width: React.PropTypes.number,
        /**
         * Min width for chart as px
         */
        minWidth: React.PropTypes.number,
        /**
         * Height for chart as px
         */
        height: React.PropTypes.number,
        /**
         * Data to be plotted on the chart
         */
        data: React.PropTypes.array,
        /**
         * Change to be made for the given data
         */
        meta: React.PropTypes.array,
        /**
         *
         */
        legendWidth: React.PropTypes.number,
    };

    static defaultProps = {
        width: 500,
        height: 300,
        minWidth: 150,
        data: [],
        meta: []
    };

    legends = [];

    constructor(props: Object) {
        super(props);
        this.state = {
            scale: 1,
            marginTop: 0
        };
    }


    __onResize = ({width, height}) => {
        let scale = Math.max(width, this.props.minWidth) / (this.props.width + 40);
        let margin = 100 - scale * 100;
        this.setState({
            scale: scale <= 1 ? scale : 1,
            marginTop: margin > 0 ? -1 * (this.props.height / 100 + 1) * margin : 0
        });
    };

    render() {
        let label = (this.props.label === undefined) ? undefined : (
                <h3 className="rb-line-chart-label">{this.props.label}</h3>
            );
        return (
            <ResizeComponent
                style={{
                    transform: `scale(${this.state.scale})`,
                    transformOrigin: "bottom left",
                    marginTop: this.state.marginTop
                }}
                onResize={this.__onResize}>
                {label}
                <div className="rb-line-chart" style={{width: this.props.width, height: this.props.height}}>
                    <svg className="rb-line-chart-svg">
                        {this.__renderLines(this.props.data, this.props.meta)}
                    </svg>
                    <div className="rb-line-chart-axis">
                        {this.__renderYAxis()}
                    </div>
                    <div className="rb-line-chart-axis">
                        {this.__renderXAxis()}
                    </div>
                </div>
                <Legend data={this.legends} width={this.props.legendWidth || this.props.width}/>
            </ResizeComponent>
        )
    }

    __renderLines = (data: Array, meta: Array) => {
        let metaArr = [];
        let xAxisWidth = this.__xAxisWidth();
        let sumXAxisWidth = 0;

        for (let i = 0; i < data.length - 1; i++) {
            let item = data[i];
            let itemArr = [];
            let nexItem;

            if (data[i + 1]) {
                nexItem = data[i + 1];
            }

            let fields = this.__getFields(item);

            for (let j in fields) {

                let key = fields[j].key,
                    value = fields[j].value,
                    nexValue = value;

                if (nexItem) {
                    nexValue = nexItem[key];
                }

                let properties = Arrays.getValueByKey(meta, "dataKey", key);
                properties = properties === undefined ? {} : properties;

                let tooltip = item.name + "\n" + (properties.name || key) + " : " + value + " " + (properties.unit || "") + "\n",
                    tooltipNext = nexItem.name + "\n" + (properties.name || key) + " : " + nexValue + " " + (properties.unit || "") + "\n";

                let fill = properties.fill || this.__randColor(j);

                this.legends[properties.name || key] = {fill: fill, label: properties.name || key};

                let pointY = this.__pointY(value),
                    nextPointY = this.__pointY(nexValue),
                    x1 = sumXAxisWidth,
                    y1 = pointY,
                    x2 = sumXAxisWidth + xAxisWidth,
                    y2 = nextPointY;

                itemArr.push(
                    <line
                        key={key}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        data={tooltip + tooltipNext}
                        strokeLinecap="round"
                        stroke={fill}
                        strokeWidth="4">
                    </line>
                );
            }

            sumXAxisWidth += xAxisWidth;

            metaArr.push(
                <g key={i}>
                    {itemArr}
                </g>)
        }
        return metaArr;
    };


    __renderYAxis = () => {
        let maxYAxis = this.__maxYAxis();
        let height = this.props.height / 4;
        let axisArr = [];
        for (let i = 0; i < 4; i++) {
            axisArr.push(
                <div key={i}
                     id={parseInt((maxYAxis / 4) * (4 - i))}
                     className="rb-line-y-axis"
                     style={{height: height}}>
                </div>);
        }
        return axisArr;
    };

    __renderXAxis = () => {
        let data = this.props.data;
        let width = this.__xAxisWidth();
        let axisArr = [];
        for (let i = 0; i < data.length - 1; i++) {
            let item = data[i],
                nextItem = data[i + 1] || {};
            axisArr.push(
                <div key={i}
                     className="rb-line-x-axis"
                     data={item.name}
                     name={nextItem.name}
                     style={{width: width}}>
                </div>);
        }
        return axisArr;
    };

    __maxYAxis = () => {
        let data = this.props.data;
        let maxYAxis = 0;
        for (let i in data) {
            let fields = this.__getFields(data[i]);
            for (let j in fields) {
                if (fields[j].value > maxYAxis)
                    maxYAxis = fields[j].value;
            }
        }
        let a = maxYAxis > 1000 ? 1000 : maxYAxis > 100 ? 100 : maxYAxis > 50 ? 50 : maxYAxis > 10 ? 10 : 1;

        return (~~((maxYAxis + a - 1) / a) * a);
    };

    __xAxisWidth = () => {
        return (this.props.width - 1) / (this.props.data.length - 1);
    };

    __pointY = (value: Number) => {
        let maxYAxis = this.__maxYAxis();
        return ((this.props.height * ((value * 100) / maxYAxis)) / 100);
    };

    __getFields = (data: Object) => {
        let arr = [];
        for (let key in data) {
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


    __randColor = (index: Number) => {
        let colors = ["#F44336", "#673AB7", "#2196F3", "#FF5722", "#9C27B0", "#FFC107", "#FF9800", "#4CAF50", "#00796B", "#009688", "#3F51B5"];
        if (index !== undefined) {
            return colors[index % colors.length];
        }
        return colors[Math.floor(Math.random() * (colors.length - 1))];
    };

}