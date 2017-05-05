import React from 'react';
import Length from './Length';
import Clock from './Clock';

import {inBetween, setTimer, mobileCheck} from '../helpers/';

import '../main.css';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      breakLength: 1,
      sessionLength: 25,
      isRunning: false,
      breakOrSession: null,
      secondsOnStart: 1500,
      secondsLeft: 1500,
      intervalID: null
    }
  }

  handleLengthChange(whichLength, change){
    let {breakLength, sessionLength} = this.state;
    if(whichLength === "break"){
      breakLength += change;
    }else{
      sessionLength += change;
    }
    if(!this.state.isRunning && inBetween(breakLength, 0, 60) && inBetween(sessionLength, 0, 60)){
      let secondsUpdated = sessionLength * 60;
      this.setState({
        breakLength: breakLength,
        sessionLength: sessionLength,
        secondsOnStart: secondsUpdated,
        secondsLeft: secondsUpdated
      });
    }
  }

  handleStartClick(){

    let isOnMobile = mobileCheck();

    if(!this.state.isRunning){
      if(!isOnMobile){
        this.sendNotification("Go to work!!", "Your work session time has started, we will get back to you when you're done");
      }
      let seconds = this.state.secondsOnStart;

      let interval = setTimer(seconds,
        // Callback on each second
        () => {
          let secondsLeft = this.state.secondsLeft;
          secondsLeft--;
          this.setState({
            secondsLeft: secondsLeft
          });
        },
        // Callback when finished
        () => {
          let seconds = this.state.breakOrSession === "session" ? this.state.breakLength * 60 : this.state.sessionLength * 60;
          let breakOrSession = this.state.breakOrSession === "session" ? "break" : "session";

          this.setState({
            breakOrSession: breakOrSession,
            secondsOnStart: seconds,
            secondsLeft: seconds,
          });

          if(!isOnMobile){
            if(breakOrSession === "session"){
              this.sendNotification("Go to work!!", "Your work session time has started, we will get back to you when you're done");
            }else{
              this.sendNotification("Phew! Time to take a break...", "Go outside, take some fresh air and come back in " + this.state.breakLength + " minutes");
            }
          }

          return seconds;
      });

      this.setState({
        isRunning: true,
        breakOrSession: "session",
        intervalID: interval
      });
    }else{
      clearInterval(this.state.intervalID);

      this.setState({
        isRunning: false,
        intervalID: null
      });
    }
  }

  sendNotification(title, body){
    new Notification(title, {
      body: body,
      tag: "Podomoro",
      icon: "img/Sonya-Swarm-Turkey.ico",
      img: "img/Sonya-Swarm-Turkey.ico"
    });
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
              label="Break"
              whichLength="break"
              value={this.state.breakLength}
              onLengthChange={this.handleLengthChange.bind(this)}
            />
          </div>
          <div className="col s6">
            <Length
              label="Session"
              whichLength="session"
              value={this.state.sessionLength}
              onLengthChange={this.handleLengthChange.bind(this)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <Clock
              secondsOnStart={this.state.secondsOnStart}
              secondsLeft={this.state.secondsLeft}
              isRunning={this.state.isRunning}
              onStartClick={this.handleStartClick.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
