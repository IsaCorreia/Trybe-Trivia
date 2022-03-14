import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore, removeQuestion } from '../redux/actions';
import PropTypes from 'prop-types';

class ButtonNext extends Component {
  constructor(){
    super();
    this.handleClickNext = this.handleClickNext.bind(this);
  }
  handleScore = () => {
    const BASE_SCORE = 10;
    const timer = 1;
    let dificulty = 0;
    const { score, updateScoreGame, questionList } = this.props;
    switch (questionList[0].difficulty){
      case 'hard':
        dificulty = 3;
      break;
      case 'medium':
        dificulty = 2;
      break;
      case 'easy':
        dificulty = 1;
      break;
      default:
        dificulty = 0;
      break;
    }
    const newScore = score + ( BASE_SCORE + (timer * dificulty));
    updateScoreGame(newScore);
  }

  handleClickNext() {
    const {
      answerSelected,
      questionList,
      removeQuestionAnswered,
      history,
    } = this.props;
    console.log(history);
    if ((questionList[0].correct_answer) === answerSelected) {
      this.handleScore()
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
        onClick={ () => this.handleClickNext() }>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNext);