import React, {Component} from "react";
import BarChart from "../../lib/BarChart";

export default class BarChartSample extends Component {

    data = [
        {name: "A", public: 4000, private: 2400, protected: 2400},
        {name: "B", public: 3000, private: 1398, protected: 2210},
        {name: "C", public: 2000, private: 9800, protected: 2290},
        {name: "D", public: 2780, private: 3908, protected: 2000},
        {name: "E", public: 1890, private: 4800, protected: 2181},
        {name: "F", public: 2390, private: 3800, protected: 2500},
        {name: "G", public: 3490, private: 4300, protected: 2100}
    ];

    meta = [
        {dataKey: "public", name: "Public", unit: "piece"},
        {dataKey: "private", name: "Private", unit: "piece"},
        {dataKey: "protected", name: "Protected", unit: "piece"}
    ];

    render() {
        return (
            <div>
                <BarChart data={this.data} width={300} height={200} meta={this.meta}/>
            </div>
        );
    }

}