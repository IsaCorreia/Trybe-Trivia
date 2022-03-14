import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore, removeQuestion } from '../redux/actions';

class ButtonNext extends Component {
  constructor() {
    super();
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleScore = () => {
    const BASE_SCORE = 10;
    const timer = 1;
    let dificulty = 0;
    const POINTS_FOR_HARD = 3;
    const POINTS_FOR_MEDIUM = 2;
    const POINTS_FOR_EASY = 1;
    const { score, updateScoreGame, questionList } = this.props;
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
    const newScore = score + (BASE_SCORE + (timer * dificulty));
    updateScoreGame(newScore);
  }

  handleClickNext() {
    const {
      answerSelected,
      questionList,
      removeQuestionAnswered,
      history,
    } = this.props;
    console.log(this.props);
    if ((questionList[0].correct_answer) === answerSelected) {
      this.handleScore();
    }
    removeQuestionAnswered(questionList[0].question);
    if (questionList.length === 1) {
      history.push('/feedback');
    }
  }

  render() {
    return (
      <button
        type="button"
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
});

const mapDispatchToProps = (dispatch) => ({
  updateScoreGame: (score) => dispatch(updateScore(score)),
  removeQuestionAnswered: (question) => dispatch(removeQuestion(question)),
});

ButtonNext.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  removeQuestionAnswered: PropTypes.func.isRequired,
  questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateScoreGame: PropTypes.func.isRequired,
  answerSelected: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNext);
