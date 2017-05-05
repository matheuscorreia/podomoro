import React from 'react';
import { Circle } from 'rc-progress';

import {formatTimer} from '../helpers/';

import '../main.css';

export default class Clock extends React.Component {
  render(){

    let label = formatTimer(this.props.secondsLeft);

    let percentage = this.props.secondsLeft / this.props.secondsOnStart * 100;

    return (
      <div className="clock-container center-align">
        <div className="timer center-align">
          <h2>{label}</h2>
        </div>

        <a className="waves-effect waves-light btn-floating btn-large red startBtn" onClick={() => { this.props.onStartClick() }}>
          <i className="material-icons">{this.props.isRunning ? "pause" : "play_arrow"}</i>
        </a>

        <Circle percent={percentage} strokeWidth="2" strokeColor="#C4C9E8" />
      </div>
    );
  }
}
