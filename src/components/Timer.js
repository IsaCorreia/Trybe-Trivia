import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Timer.propTypes = {
  time: PropTypes.string.isRequired,
};
