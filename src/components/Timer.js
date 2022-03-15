import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTime } from '../redux/actions';

class Timer extends Component {
  render() {
    const { saveTimerInfo, time } = this.props;
    saveTimerInfo(time);
    return (
      <h1>
        {`Tempo: ${time}`}
      </h1>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveTimerInfo: (time) => dispatch(saveTime(time)),
});

export default connect(null, mapDispatchToProps)(Timer);

Timer.propTypes = {
  time: PropTypes.string.isRequired,
  saveTimerInfo: PropTypes.func.isRequired,
};
