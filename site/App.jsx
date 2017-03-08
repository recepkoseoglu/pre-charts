import React, {Component} from "react";
import {Card, CardActions, CardMedia, CardTitle, CardText} from "material-ui/Card";
import AreaChartSample from "./samples/AreaChartSample";
import BarChartSample from "./samples/BarChartSample";
import LineChartSample from "./samples/LineChartSample";
import ScatterChartSample from "./samples/ScatterChartSample";
import PieChartSample from "./samples/PieChartSample";


export default class App extends Component {


    render() {
        return (
            <div style={{maxWidth: 390, margin: "0 auto"}}>
                <Card>
                    <CardTitle title="Area Chart" subtitle="pre-charts"/>
                    <AreaChartSample/>
                </Card>
                <br/>
                <Card>
                    <CardTitle title="Bar Chart" subtitle="pre-charts"/>
                    <BarChartSample/>
                </Card>
                <br/>
                <Card>
                    <CardTitle title="Line Chart" subtitle="pre-charts"/>
                    <LineChartSample/>
                </Card>
                <br/>
                <Card>
                    <CardTitle title="Scatter Chart" subtitle="pre-charts"/>
                    <ScatterChartSample/>
                </Card>
                <br/>
                <Card>
                    <CardTitle title="Pie Chart" subtitle="pre-charts"/>
                    <PieChartSample/>
                </Card>
            </div>);
    }
}