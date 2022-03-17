import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addAnswerSelected,
  setButtonVisibility,
  updateAssertion,
  updateScore,
} from '../redux/actions';
import './Answers.css';

class Answers extends Component {
  selectAnswer = (target) => {
    const { saveAnswerSelected, isNextVisible } = this.props;
    const { id } = target;
    const answerSelected = id;
    saveAnswerSelected(answerSelected);
    isNextVisible(false);
  };

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

  handleClick = ({ target }) => {
    const {
      setColorButton,
      answerSelected,
      questionList,
      setAnswerDisable,
    } = this.props;
    const LIMIT_INTERVAL = 99999;
    setColorButton('correct-color', 'wrong-color');
    for (let i = 1; i < LIMIT_INTERVAL; i += 1) {
      window.clearInterval(i);
    } // https://stackoverflow.com/questions/958433/how-can-i-clearinterval-for-all-setinterval
    this.selectAnswer(target);
    setAnswerDisable();
    if ((questionList[0].correct_answer) === answerSelected) {
      this.handleScore();
    }
  }

  render() {
    const {
      disable,
      classCorrect,
      classWrong,
      shuffledAnswers,
    } = this.props;

    return (
      shuffledAnswers
        && (
          <section className="options-container" data-testid="answer-options">
            {shuffledAnswers.map(({ answer, tag }) => (
              <button
                type="button"
                key={ answer }
                data-testid={ tag }
                id={ answer }
                className={
                  `answer ${tag === 'correct-answer' ? classCorrect : classWrong}`
                }
                onClick={ this.handleClick }
                disabled={ disable }
              >
                {answer}
              </button>
            ))}
          </section>
        )
    );
  }
}

Answers.propTypes = {
  disable: PropTypes.bool.isRequired,
  saveAnswerSelected: PropTypes.func.isRequired,
  isNextVisible: PropTypes.func.isRequired,
  setColorButton: PropTypes.func.isRequired,
  classCorrect: PropTypes.string.isRequired,
  classWrong: PropTypes.string.isRequired,
  answerSelected: PropTypes.objectOf(PropTypes.string).isRequired,
  shuffledAnswers: PropTypes.objectOf(PropTypes.any).isRequired,
  assertionValue: PropTypes.number.isRequired,
  questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  ADDAssertions: PropTypes.func.isRequired,
  setAnswerDisable: PropTypes.func.isRequired,
  timerValue: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  updateScoreGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  trivia: state.results,
  questionList: state.questions,
  answerSelected: state.answerSelected,
});

const mapDispatchToProps = (dispatch) => ({
  saveAnswerSelected: (answerId) => dispatch(addAnswerSelected(answerId)),
  isNextVisible: (status) => dispatch(setButtonVisibility(status)),
  ADDAssertions: (assertionNum) => dispatch(updateAssertion(assertionNum)),
  updateScoreGame: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
