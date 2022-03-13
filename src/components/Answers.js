import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Answers extends Component {
  state = {
    classCorrect: '',
    classWrong: '',
  }

  render() {
    const { correct = '', wrong = [] } = this.props;
    const { classCorrect, classWrong } = this.state;
    const correctAnswer = { answer: correct, tag: 'correct-answer' };
    const incorrectAnswers = wrong.reduce((acc, cur, idx) => {
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
                className={ tag === correct - answer ? classCorrect : classWrong }
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
};

const mapStateToProps = (state) => ({
  trivia: state.results,
});

export default connect(mapStateToProps)(Answers);
