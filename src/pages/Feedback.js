import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

class Feedback extends Component {

  getMessagesFeedback = (() => {
    const{ questionAssertions } = this.props;
    if (questionAssertions < 3) {
      return 'Could be better...';
    } else {
      return 'Well Done!';
    }
  })

  render() {
    const msgFeedback = this.getMessagesFeedback;
    return (
      <div id="feedback-Screen">
        <Header />
        <div>
          <h1 data-testid="feedback-text">{ msgFeedback }</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionAssertions: state.player.assertions,
});

Feedback.propTypes = {
  questionAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
