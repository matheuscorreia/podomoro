import React from 'react';
import { Circle } from 'rc-progress';

import '../main.css';

export default class Clock extends React.Component {
  render(){

    return (
      <div className="clock-container center-align">
        <div className="timer center-align">
          <h2>{this.props.clockLabel}</h2>
        </div>

        <a className="waves-effect waves-light btn-floating btn-large red startBtn" onClick={() => this.props.onButtonClick()}>
          <i className="material-icons">{this.props.isRunning ? "pause" : "play_arrow"}</i>
        </a>

        <Circle percent={this.props.percentage} strokeWidth="2" strokeColor="#D3D3D3"/>
      </div>
    );
  }
}
