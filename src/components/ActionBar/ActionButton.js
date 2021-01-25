import React from "react";

import ActionButtonOverlay  from "./ActionButtonOverlay.js"

var fs = require("fs");

class ActionButton extends React.Component {
    constructor(props) {
        super(props)

        this.buttonClick = this.buttonClick.bind(this);
    }


    buttonClick(e) {
        console.log("Clicked!")
        if ((this.props.button.global === true)&&(this.props.globalcooldown >= 2.5)) {
            this.props.castGlobal(this.props.button.name);
        }
        if (this.props.button.animlock != undefined) {
            this.props.castAnimLock(this.props.button.name,this.props.button.animlock)
        }
        else {
            this.props.castAnimLock(this.props.button.name)
        }
    }

    render() {
        return (
            <div className="ActionBar_ActionButton" onClick={() => {this.buttonClick()}} style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}${this.props.button.texture})`,
                backgroundRepeat: "none",
                backgroundSize: "cover",
                width: "50px",
                height: "50px"
                }}>
                <ActionButtonOverlay buttonid={this.props.buttonid} global={this.props.button.global} globalcooldown={this.props.globalcooldown} animcooldown={this.props.animcooldown}/>
			</div>
        )
    }
}

export default ActionButton;