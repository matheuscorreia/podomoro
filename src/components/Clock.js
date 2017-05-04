import React from 'react';
import { Circle } from 'rc-progress';

import '../main.css';

export default class Clock extends React.Component {
  render(){

    return (
      <div className="clock-container center-align">

        <h2 className="timer">25:00</h2>

        <a className="btn-floating btn-large waves-effect waves-light red startBtn">
          <i className="material-icons">{this.props.icon}</i>
        </a>

        <Circle percent={this.props.percent} strokeWidth="2" strokeColor="#D3D3D3"/>
      </div>
    );
  }
}
