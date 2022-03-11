import React, { Component } from 'react'
import { connect } from 'react-redux';

class Answers extends Component {
  render() {
    const { correct, wrong } = this.props;
    const correctAnswer = {answer: correct, tag: "correct-answer"}
    const incorrectAnswers = wrong.reduce((acc, cur, idx) => {
      acc.push({answer: cur, tag: `wrong-answer-${idx}`});
      return acc;
    }, [])
    const allAnswers = [correctAnswer, ...incorrectAnswers]
    const shuffledAnswers = allAnswers.sort((a, b) => 0.5 - Math.random()); //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
    return (
      correct
      ? (
        <section data-testid="answer-options">
          {shuffledAnswers.map(({answer, tag}) => (
            <button key={answer} data-testid={tag === "correct_answer" ? tag : `${tag}`}>
              {answer}
            </button>
          ))}
        </section>
      )
      : null
    )
  }
}


const mapStateToProps = (state) => ({
  trivia: state.results,
})

export default connect(mapStateToProps)(Answers);
