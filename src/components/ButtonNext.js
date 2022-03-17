import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateScore,
  removeQuestion,
  setButtonVisibility,
} from '../redux/actions';
import './ButtonNext.css';

class ButtonNext extends Component {
  constructor() {
    super();
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickNext() {
    const {
      questionList,
      removeQuestionAnswered,
      history,
      isNextVisible,
      resetTimer,
      setColorButton,
    } = this.props;
    removeQuestionAnswered(questionList[0].question);
    isNextVisible(true);
    if (questionList.length === 1) {
      history.push('/feedback');
    }
    resetTimer();
    setColorButton();
  }

  render() {
    const { buttonStatus } = this.props;
    return (
      <button
        type="button"
        className="btnNext"
        hidden={ buttonStatus }
        data-testid="btn-next"
        onClick={ () => this.handleClickNext() }
      >
        Próxima
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  answerSelected: state.answerSelected,
  questionList: state.questions,
  score: state.player.score,
  assertionValue: state.player.assertions,
  buttonStatus: state.isNextVisible,
  timerValue: state.timerInfo,
});

const mapDispatchToProps = (dispatch) => ({
  updateScoreGame: (score) => dispatch(updateScore(score)),
  removeQuestionAnswered: (question) => dispatch(removeQuestion(question)),
  isNextVisible: (status) => dispatch(setButtonVisibility(status)),
  resetCounter: (time) => dispatch((time)),
});

ButtonNext.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  removeQuestionAnswered: PropTypes.func.isRequired,
  questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setColorButton: PropTypes.func.isRequired,
  isNextVisible: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  buttonStatus: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNext);
