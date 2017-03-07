import React, {Component} from "react";
import AreaChartSample from "./samples/AreaChartSample";
import BarChartSample from "./samples/BarChartSample";
import LineChartSample from "./samples/LineChartSample";
import ScatterChartSample from "./samples/ScatterChartSample";
import PieChartSample from "./samples/PieChartSample";


export default class App extends Component {


    render() {
        return (
            <div style={{width: "100%"}}>
                <div style={{width: 340, margin: "0 auto"}}>
                    <h3>Area Chart</h3>
                    <AreaChartSample/>
                    <h3>Bar Chart</h3>
                    <BarChartSample/>
                    <h3>Line Chart</h3>
                    <LineChartSample/>
                    <h3>Scatter Chart</h3>
                    <ScatterChartSample/>
                    <h3>Pie Chart</h3>
                    <PieChartSample/>
                </div>
            </div>);
    }
}