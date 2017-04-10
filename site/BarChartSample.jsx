import React, {Component} from "react";
import BarChart from "../lib/BarChart";

export default class BarChartSample extends Component {

    data = [
        {name: "A", public: 4000, private: 2400, protected: 2400},
        {name: "B", public: 3000, private: 1398, protected: 2210},
        {name: "C", public: 2000, private: 9800, protected: 2290}
    ];

    meta = [
        {dataKey: "public", name: "Public", unit: "piece"},
        {dataKey: "private", name: "Private", unit: "piece"},
        {dataKey: "protected", name: "Protected", unit: "piece"}
    ];

    render() {
        return (
            <BarChart
                label={"Bar Chart"}
                data={this.data}
                meta={this.meta}
                width={300}
                height={200}/>
        );
    }

}