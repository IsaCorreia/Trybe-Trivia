import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAnswerSelected } from '../redux/actions';

class Answers extends Component {
  state = {
    classCorrect: '',
    classWrong: '',
  }

  selectAnswer = (target) => {
    const { saveAnswerSelected } = this.props;
    const { id } = target;
    const answerSelected = id;
    saveAnswerSelected(answerSelected);
  };

  setColorButton = () => {
    this.setState({
      classCorrect: 'correct-color',
      classWrong: 'wrong-color',
    });
  }

  handleClick = ({ target }) => {
    const LIMIT_INTERVAL = 99999;
    this.setColorButton();
    for (let i = 1; i < LIMIT_INTERVAL; i += 1) { window.clearInterval(i); } // https://stackoverflow.com/questions/958433/how-can-i-clearinterval-for-all-setinterval
    this.selectAnswer(target);
  }

  render() {
    const { correct = '', wrong = [], disable } = this.props;
    const { classCorrect, classWrong } = this.state;
    const correctAnswer = { answer: correct, tag: 'correct-answer' };
    const incorrectAnswers = wrong && wrong.reduce((acc, cur, idx) => {
      acc.push({ answer: cur, tag: `wrong-answer-${idx}` });
      return acc;
    }, []);
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const RANDOM_POS = 0.5;
    const shuffledAnswers = allAnswers.sort(() => RANDOM_POS - Math.random()); // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
    return (
      correct
        && (
          <section data-testid="answer-options">
            {shuffledAnswers.map(({ answer, tag }) => (
              <button
                type="button"
                key={ answer }
                data-testid={ tag }
                id={ answer }
                className={ tag === 'correct-answer' ? classCorrect : classWrong }
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
  saveAnswerSelected: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  trivia: state.results,
});

const mapDispatchToProps = (dispatch) => ({
  saveAnswerSelected: (answerId) => dispatch(addAnswerSelected(answerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
