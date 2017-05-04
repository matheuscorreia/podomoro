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
      clockLabel: 25,

      isRunning: false,
      isPaused: false,

      sessionInterval: {
        intervalID: null,
        initialSeconds: null,
        secondsLeft: null
      },
      breakInterval: {
        intervalID: null,
        initialSeconds: null,
        secondsLeft: null
      },
      percentage: 100
    }
  }

  getInitialState(){
    return {
      breakLength: 1,
      sessionLength: 25,
      clockLabel: 25,

      isRunning: false,
      isPaused: false,

      sessionInterval: {
        intervalID: null,
        initialSeconds: null,
        secondsLeft: null
      },
      breakInterval: {
        intervalID: null,
        initialSeconds: null,
        secondsLeft: null
      },
      percentage: 100
    }
  }

  handleLengthChange(whichLength, change){
    let thisState = Object.assign({}, this.state);
    if(!thisState.isRunning){
      let {breakLength, sessionLength} = thisState;

      if(whichLength === "break"){
        breakLength += change;
      }else{
        sessionLength += change;
      }
      if((breakLength > 0 && breakLength < 60) && (sessionLength > 0 && sessionLength < 60)){
        this.setState({clockLabel: sessionLength,breakLength: breakLength, sessionLength: sessionLength});
      }
    }
  }

  decrementSession(){
    let thisState = Object.assign({}, this.state);
    let sessionInterval = thisState.sessionInterval;

    sessionInterval.secondsLeft--;

    let clockLabelMinutes = Math.floor(sessionInterval.secondsLeft / 60);
    let clockLabelSeconds = sessionInterval.secondsLeft % 60;

    let percentage = (sessionInterval.secondsLeft / sessionInterval.initialSeconds) * 100;

    if(sessionInterval.secondsLeft !== 0 ){
      this.setState({
        clockLabel: clockLabelMinutes + ':' + clockLabelSeconds,
        percentage: percentage,
        sessionInterval: sessionInterval
      });
    }else{

    }
  }

  handleCircleClick(){
    let thisState = Object.assign({}, this.state);

    if(!thisState.isRunning){
      // if clicked while not running (paused, or to start)
      if(!thisState.isPaused){
        // to start
        let SintervalId = setInterval(this.decrementSession.bind(this), 1000);
        let initialSeconds = thisState.sessionLength * 60;

        this.setState({
          isRunning: true,
          sessionInterval: {
            intervalID: SintervalId,
            initialSeconds: initialSeconds,
            secondsLeft: initialSeconds
          }
        });
      }else{
        // paused
      }
    }else{
      //let sessionInterval = thisState.sessionInterval;



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
              isRunning={this.state.isRunning}
              clockLabel={this.state.clockLabel}
              percentage={this.state.percentage}
              onButtonClick={this.handleCircleClick.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
