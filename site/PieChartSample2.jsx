import React, {Component} from "react";
import PieChart from "../lib/PieChart";

let data = [
    {
        value: 1500,
        label: "A",
        key: "0",
        unit: "ms"
    },
    {
        value: 2500,
        label: "B",
        key: "1",
        unit: "ms"
    },
    {
        value: 3000,
        label: "C",
        key: "3",
        unit: "ms"
    }
];


export default class PieChartSample2 extends Component {

    render() {
        return (
            <PieChart
                label={"Pie Chart"}
                size={170}
                data={data}/>
        );
    }
}

