import React from 'react';

import '../main.css';

export default class Length extends React.Component {
  render(){
    return (
      <div className="breakLengthAdjuster center-align">
        <h5>{this.props.label}</h5>
        <div>
          <a className="waves-effect waves-light btn-floating transparent" onClick={() => this.props.onLengthChange(this.props.whichLength, -1)}>
            <i className="material-icons">remove</i>
          </a>
            <span className="lengthValues">{this.props.value}</span>
          <a className="waves-effect waves-light btn-floating transparent" onClick={() => this.props.onLengthChange(this.props.whichLength, 1)}>
            <i className="material-icons">add</i>
          </a>
        </div>
      </div>
    );
  }
}
