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
  state = {
    correctAnswerState: '',
  }

  selectAnswer = (target) => {
    const { saveAnswerSelected, isNextVisible } = this.props;
    const { id } = target;
    const answerSelected = id;
    saveAnswerSelected(answerSelected);
    isNextVisible(false);
  };

  handleScore = () => {
    const {
      score,
      updateScoreGame,
      questionList,
      timerValue,
    } = this.props;
    const BASE_SCORE = 10;
    let dificulty = 0;
    const POINTS_FOR_HARD = 3;
    const POINTS_FOR_MEDIUM = 2;
    const POINTS_FOR_EASY = 1;
    
    
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
    const { id } = target;
    const answerSelected = id;
    const {
      setColorButton,
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
    if ((questionList[0].correct_answer) === answerSelected ) {
      this.handleScore();
    }
  }

  render() {
    const {
      correct = '',
      wrong = [],
      disable,
      classCorrect,
      classWrong,
    } = this.props;
    const { correctAnswerState } = this.state;
    if (correctAnswerState !== correct) {
      this.setState({
        correctAnswerState: correct,
      });
    }
    const correctAnswer = { answer: correct, tag: 'correct-answer' };
    const incorrectAnswers = wrong && wrong.reduce((acc, cur, idx) => {
      acc.push({ answer: cur, tag: `wrong-answer-${idx}` });
      return acc;
    }, []);
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const RANDOM_POS = 0.5;
    const shuffledAnswers = correctAnswerState !== correct
      ? allAnswers.sort(() => RANDOM_POS - Math.random()) // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
      : allAnswers;

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
  correct: PropTypes.string.isRequired,
  wrong: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  saveAnswerSelected: PropTypes.func.isRequired,
  isNextVisible: PropTypes.func.isRequired,
  setColorButton: PropTypes.func.isRequired,
  classCorrect: PropTypes.string.isRequired,
  classWrong: PropTypes.string.isRequired,
  answerSelected: PropTypes.objectOf(PropTypes.string).isRequired,
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
  score: state.player.score,
  timerValue: state.timerInfo,
  assertionValue: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  saveAnswerSelected: (answerId) => dispatch(addAnswerSelected(answerId)),
  isNextVisible: (status) => dispatch(setButtonVisibility(status)),
  ADDAssertions: (assertionNum) => dispatch(updateAssertion(assertionNum)),
  updateScoreGame: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
