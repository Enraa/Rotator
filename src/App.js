import logo from './logo.svg';
import './App.css';
import React from "react";

// Component Imports
import ActionBar from './components/ActionBar.js'
import InfoWindow from './components/InfoWindow.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      timestart: parseFloat(Date.now()),
      currenttime: 0.0,
      globalcooldownstart: parseFloat(Date.now()),
      globalcooldown: 0.0,
      animcooldownstart: parseFloat(Date.now()),
      animcooldown: 0.0,
      animcooldownmax: 0.7,
      gamemode: "ff14",
      actionbars: [
        [
          {
            name: "Cure",
            potency: 300,
            global: true,
            texture: 'textures/skills/ff14_cure.png'
          },
          {
            name: "Cure II",
            potency: 500,
            global: true,
            texture: 'textures/skills/ff14_cureii.png'
          },
          {
            name: "Assize",
            potency: 200,
            global: false,
            texture: 'textures/skills/ff14_assize.png'
          },
          {
            name: "Thin Air",
            potency: 0,
            global: false,
            texture: 'textures/skills/ff14_thinair.png'
          }
        ]
      ]
    };
    
    this.castGlobal = this.castGlobal.bind(this);
    this.castAnimLock = this.castAnimLock.bind(this);
  }

  componentDidMount() {
    var self = this;
    setInterval(() => {
      var timeelapsed = (Date.now() - self.state.timestart)/1000;
      if (self.state.globalcooldown < 2.5) {
        var globalcooldown = (Date.now() - self.state.globalcooldownstart)/1000;
        self.setState({
          globalcooldown: globalcooldown
        })
        console.log(this.state.globalcooldown);
      }
      if (self.state.animcooldown < self.state.animcooldownmax) {
        var animcooldown = (Date.now() - self.state.animcooldownstart)/1000;
        self.setState({
          animcooldown: animcooldown
        })
        console.log(this.state.animcooldown);
      }
      self.setState({
        currenttime: timeelapsed
      })
    },50);
  }  

  // This will be called whenever a global cooldown inducing skill is used. 
  // It will lock out using any ability that requires GCD. 
  castGlobal(e) {
    this.setState({
      globalcooldownstart: parseFloat(Date.now()),
      globalcooldown: 0.0
    })
    console.log(`Global Cooldown triggered by ${e}`)
  }

  // This will be called whenever a skill is used, regardless if it uses GCD or not. 
  // This will prevent any action, including oGCD skills.
  castAnimLock(e,val = 0.7) { 
    console.log(val);
    this.setState({
      animcooldownstart: parseFloat(Date.now()),
      animcooldown: 0.0,
      animcooldownmax: val
    })
    console.log(`Animation Lock Cooldown triggered by ${e}`)
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <InfoWindow timeelapsed={this.state.currenttime} globalcooldown={this.state.globalcooldown} animcooldown={this.state.animcooldown}/>
          <ActionBar actionbars={this.state.actionbars[0]} castGlobal={(e) => {this.castGlobal(e)}} globalcooldown={this.state.globalcooldown} castAnimLock={(e,val) => {this.castAnimLock(e,val)}} animcooldown={this.state.animcooldown}/>
        </header>
      </div>
    );
  }
}

export default App;
