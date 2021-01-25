import React from "react";


import ActionButton from "./ActionBar/ActionButton.js"

var fs = require("fs");

class ActionBar extends React.Component {
    constructor(props) {
        super(props)

        this.castGlobal = this.castGlobal.bind(this);
        this.castAnimLock = this.castAnimLock.bind(this);
    }

    castGlobal(e) {
        this.props.castGlobal(e);
    }

    castAnimLock(e,val) {
        this.props.castAnimLock(e,val);
    }

    render() {
        var self = this;
        var idcount = -1;
        return (
            <div>
                {this.props.actionbars.map(function (el) {
                        idcount++;
                        return (
                            <ActionButton button={el} castGlobal={(e) => {self.castGlobal(e)}} globalcooldown={self.props.globalcooldown} castAnimLock={(e,val) => {self.castAnimLock(e,val)}} animcooldown={self.props.animcooldown} buttonid={idcount}/>
                        );
                    })
                }
			</div>
        )
    }
}

export default ActionBar;