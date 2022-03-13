import React, { Component } from 'react';

class Timer extends Component {
  render() {
    const { time } = this.props;
    return (
      <h1>
        {`Tempo: ${time}`}
      </h1>
    );
  }
}

export default Timer;
