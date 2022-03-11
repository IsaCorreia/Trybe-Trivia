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
    const shuffledAnswers = allAnswers.sort((a, b) => 0.5 - Math.random());
    return (
      correct
      ? (
        <section data-testid="answer-options">
          {shuffledAnswers.map(({answer, tag, idx}) => (
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

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
