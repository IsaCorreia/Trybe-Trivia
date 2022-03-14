import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore, removeQuestion } from '../redux/actions';

class ButtonNext extends Component {
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

  handleClickNext = () => {
    const { answerSelected, questionList, removeQuestionAnswered } = this.props;
    if ((questionList[0].correct_answer) === answerSelected) {
      this.handleScore()
    }
    removeQuestionAnswered(questionList[0].question);

      // remove obj da chave questions (criar action)
    // verifica se a chave está vazia: se sim vai pra tela de feedback
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNext);