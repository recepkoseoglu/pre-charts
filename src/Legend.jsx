import React, {Component} from "react";
import "./Legend.css";

export default class Legend extends Component {

    static propTypes = {
        className: React.PropTypes.string,
        width: React.PropTypes.number,
        data: React.PropTypes.array,
    };

    static defaultProps = {
        width: 500,
        data: []
    };

    render() {
        return (
            <div
                className={this.props.className}
                style={{width: this.props.width, marginTop: 20, marginLeft: 40, ...this.props.style}}>
                <div className="pre-thumbnail">
                    {this.__renderLegend()}
                </div>
            </div>
        )
    }

    __renderLegend = () => {
        let legends = this.props.data, arr = [];
        for (let key in legends) {
            if (legends.hasOwnProperty(key)) {
                let lengend = legends[key];
                arr.push(
                    <div key={key} style={{borderColor: lengend.fill, color: lengend.fill}}>
                        {lengend.label}
                    </div>)
            }
        }
        return arr;
    }

}