// Infowindow.js
//
// This component will display all the current information, including time elapsed and total potency, as well as clipped or lost time

import React from "react";

var fs = require("fs");

class InfoWindow extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
				<div>
                    Total Time Elapsed {this.props.timeelapsed}
                </div>
                <div>
                    Global Cooldown {this.props.globalcooldown}
                </div>
                <div>
                    Animation Lock {this.props.animcooldown}
                </div>
			</div>
        )
    }
}

export default InfoWindow;