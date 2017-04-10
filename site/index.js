import React from "react";
import ReactDOM from "react-dom";
import AreaChartSample from "./AreaChartSample";
import BarChartSample from "./BarChartSample";
import LineChartSample from "./LineChartSample";
import ScatterChartSample from "./ScatterChartSample";
import PieChartSample from "./PieChartSample";
import PieChartSample2 from "./PieChartSample2";
import Col from "react-bootstrap/lib/Col";

ReactDOM.render(
    <div>
        <Col xs={12} sm={4}>
            <AreaChartSample/>
        </Col>
        <Col xs={12} sm={4}>
            <BarChartSample/>
        </Col>
        <Col xs={12} sm={4}>
            <LineChartSample/>
        </Col>
        <Col xs={12} sm={4}>
            <ScatterChartSample/>
        </Col>
        <Col xs={12} sm={4}>
            <PieChartSample/>
        </Col>
        <Col xs={12} sm={4}>
            <PieChartSample2/>
        </Col>
    </div>, document.getElementById('root'));
