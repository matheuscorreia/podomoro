import React from 'react';
import Length from './Length';
import Clock from './Clock';

import '../main.css';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      breakLength: 1,
      sessionLength: 25,
      isRunning: false,
      wheelButtonIcon: "play_arrow",
      percentage: 0
    }
  }

  getInitialState(){
    return {
      breakLength: 1,
      sessionLength: 25,
      isRunning: false,
      wheelButtonIcon: "play_arrow",
      percentage: 0
    }
  }

  handleLengthChange(whichLength, change){
    let thisState = Object.assign({}, this.state);
    let bl = thisState.breakLength;
    let sl = thisState.sessionLength;

    if(whichLength === "break"){
      bl += change;
    }else{
      sl += change;
    }

    if((bl > 0 && bl < 60) && (sl > 0 && sl < 60)){
      this.setState({breakLength: bl, sessionLength: sl});
    }
  }

  handleCircleClick(){
    let thisState = Object.assign({}, this.state);

    if(thisState.isRunning){

    }else{

    }
  }

  render(){
    return (
      <div className="container">

        <div className="row">
          <div className="col s12">
            <h1 className="center-align">Podomoro Clock</h1>
          </div>
        </div>

        <div className="row">
          <div className="col s6">
            <Length
              label="Break Length"
              whichLength="break"
              value={this.state.breakLength}
              onLengthChange={this.handleLengthChange.bind(this)}
            />
          </div>
          <div className="col s6">
            <Length
              label="Session Length"
              whichLength="session"
              value={this.state.sessionLength}
              onLengthChange={this.handleLengthChange.bind(this)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <Clock
              icon={this.state.wheelButtonIcon}
              percent={this.state.percent}
            />
          </div>
        </div>
      </div>
    );
  }
}
