import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateScore,
  removeQuestion,
  updateAssertion,
  setButtonVisibility,
} from '../redux/actions';
import './ButtonNext.css';

class ButtonNext extends Component {
  constructor() {
    super();
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleScore = () => {
    const { timerValue } = this.props;
    const BASE_SCORE = 10;
    let dificulty = 0;
    const POINTS_FOR_HARD = 3;
    const POINTS_FOR_MEDIUM = 2;
    const POINTS_FOR_EASY = 1;
    const { score, updateScoreGame, questionList } = this.props;
    this.handleAssertions();
    switch (questionList[0].difficulty) {
    case 'hard':
      dificulty = POINTS_FOR_HARD;
      break;
    case 'medium':
      dificulty = POINTS_FOR_MEDIUM;
      break;
    case 'easy':
      dificulty = POINTS_FOR_EASY;
      break;
    default:
      dificulty = 0;
      break;
    }
    const newScore = score + (BASE_SCORE + (timerValue * dificulty));
    updateScoreGame(newScore);
  }

  handleAssertions = () => {
    const {
      assertionValue,
      ADDAssertions,
    } = this.props;
    const newAssertion = assertionValue + 1;
    ADDAssertions(newAssertion);
  }

  handleClickNext() {
    const {
      answerSelected,
      questionList,
      removeQuestionAnswered,
      history,
      isNextVisible,
      resetTimer,
    } = this.props;
    if ((questionList[0].correct_answer) === answerSelected) {
      this.handleScore();
    }
    removeQuestionAnswered(questionList[0].question);
    isNextVisible(true);
    if (questionList.length === 1) {
      history.push('/feedback');
    }
    resetTimer();
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
  ADDAssertions: (assertionNum) => dispatch(updateAssertion(assertionNum)),
  isNextVisible: (status) => dispatch(setButtonVisibility(status)),
  resetCounter: (time) => dispatch((time)),
});

ButtonNext.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  removeQuestionAnswered: PropTypes.func.isRequired,
  questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateScoreGame: PropTypes.func.isRequired,
  answerSelected: PropTypes.objectOf(PropTypes.string).isRequired,
  assertionValue: PropTypes.number.isRequired,
  ADDAssertions: PropTypes.func.isRequired,
  isNextVisible: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  buttonStatus: PropTypes.bool.isRequired,
  timerValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNext);
