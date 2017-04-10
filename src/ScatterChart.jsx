import React, {Component} from "react";
import ResizeComponent from "./ResizeComponent";
import Legend from "./Legend";
import Arrays from "./utils/Arrays";
import "./ScatterChart.css";

export default class ScatterChart extends Component {

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
                <h3 className="rb-scatter-chart-label">{this.props.label}</h3>
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
                <div className="rb-scatter-chart" style={{width: this.props.width, height: this.props.height}}>
                    <svg className="rb-scatter-chart-svg">
                        {this.__renderScatters(this.props.data, this.props.meta)}
                    </svg>
                    <div className="rb-scatter-chart-axis">
                        {this.__renderYAxis()}
                    </div>
                    <div className="rb-scatter-chart-axis">
                        {this.__renderXAxis()}
                    </div>
                </div>
                <Legend data={this.legends} width={this.props.legendWidth || this.props.width}/>
            </ResizeComponent>
        )
    }

    __renderScatters = (data: Array, meta: Array) => {
        let metaArr = [];
        for (let i in data) {
            let item = data[i];
            for (let j in item.data) {
                let child = item.data[j],
                    cx = this.__pointX(child.x),
                    cy = this.__pointY(child.y),
                    fill = item.fill || this.__randColor(i),
                    tooltip = item.name + "\n",
                    fields = this.__getFields(item.data[j]);

                for (let f in fields) {
                    let key = fields[f].key,
                        value = fields[f].value,
                        properties = Arrays.getValueByKey(meta, "dataKey", key);

                    properties = properties === undefined ? {} : properties;
                    tooltip += (properties.name || key) + " : " + value + " " + (properties.unit || "") + "\n";
                }
                this.legends[i] = {fill: fill, label: item.name};
                metaArr.push(
                    <circle
                        key={i + " " + j}
                        cx={cx}
                        cy={cy}
                        r={8}
                        fill={fill}
                        data={tooltip}/>);

            }
        }
        return metaArr;
    };


    __renderYAxis = () => {
        let max = this.__maxAxis();
        let height = this.props.height / 4;
        let axisArr = [];
        for (let i = 0; i < 4; i++) {
            axisArr.push(
                <div key={i}
                     id={parseInt((max.y / 4) * (4 - i))}
                     className="rb-scatter-y-axis"
                     style={{height: height}}>
                </div>);
        }
        return axisArr;
    };

    __renderXAxis = () => {
        let max = this.__maxAxis();
        let width = (this.props.width - 1) / 5;
        let axisArr = [];
        for (let i = 0; i < 5; i++) {
            axisArr.push(
                <div key={i}
                     id={parseInt((max.x / 5) * (i + 1))}
                     className="rb-scatter-x-axis"
                     style={{width: width}}>
                </div>);
        }
        return axisArr;
    };


    __maxAxis = () => {
        let data = this.props.data;
        let maxYAxis = 0;
        let maxXAxis = 0;
        for (let i in data) {
            let item = data[i];
            for (let j in item.data) {
                let fields = this.__getFields(item.data[j]);
                for (let f in fields) {
                    if (fields[f].key === "x" && fields[f].value > maxXAxis)
                        maxXAxis = fields[f].value;
                    if (fields[f].key === "y" && fields[f].value > maxYAxis)
                        maxYAxis = fields[f].value;
                }
            }
        }
        let x = maxXAxis > 1000 ? 1000 : maxXAxis > 100 ? 100 : maxXAxis > 40 ? 40 : maxXAxis > 10 ? 10 : 1;
        let y = maxYAxis > 1000 ? 1000 : maxYAxis > 100 ? 100 : maxYAxis > 50 ? 50 : maxYAxis > 10 ? 10 : 1;

        let max = {
            x: (~~((maxXAxis + x - 1) / x) * x),
            y: (~~((maxYAxis + y - 1) / y) * y)
        };

        return max;
    };

    __pointY = (value: Number) => {
        let max = this.__maxAxis();
        return this.props.height - ((this.props.height * ((value * 100) / max.y)) / 100);
    };

    __pointX = (value: Number) => {
        let max = this.__maxAxis();
        return ((this.props.width * ((value * 100) / max.x)) / 100);
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
        let colors = ["#F44336", "#FF9800", "#FF5722", "#9C27B0", "#673AB7", "#2196F3", "#FFC107", "#4CAF50", "#00796B", "#009688", "#3F51B5"];
        if (index !== undefined) {
            return colors[index % colors.length];
        }
        return colors[Math.floor(Math.random() * (colors.length - 1))];
    }
}