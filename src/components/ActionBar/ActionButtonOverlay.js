import React from "react";
import { setInterval } from "timers";

import "./../../css/buttoncooldown.css";

var fs = require("fs");

class ActionButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.setProgress = this.setProgress.bind(this);
    }

    componentDidMount() {
        var circle = document.getElementById('circle_'+this.props.buttonid);
        var radius = circle.r.baseVal.value;
        var circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
        this.setState({
            circle: circle,
            radius: radius,
            circumference: circumference
        })
        setInterval(() => {
            var complete = 100;
            if (this.props.global && this.props.globalcooldown < 2.5) {
                complete = Math.round((this.props.globalcooldown/2.5)*100)
            }
            else if (this.props.animcooldown < 0.7) {
                complete = Math.round((this.props.animcooldown/0.7)*100)
            }
            complete = 100 - complete;
            this.setProgress(complete)
        },50);
    }

    componentDidUpdate() {
        
    }

    setProgress(percent) {
        const offset = this.state.circumference - percent / 100 * this.state.circumference;
        var newcircle = this.state.circle;
        newcircle.style.strokeDashoffset = offset;
        this.setState({
            circle: newcircle
        })
    }

    render() {
        return (
            <div className="ActionBar_ActionButtonOverlay">
                <svg
                class="progress-ring"
                height="50px"
                width="50px"
                >
                <circle
                    id={"circle_"+this.props.buttonid}
                    class="progress-ring__circle"
                    stroke="white"
                    stroke-width="40"
                    fill="transparent"
                    r="20"
                    cx="25"
                    cy="25"
                />
                </svg>
			</div>
        )
    }
}

export default ActionButton;