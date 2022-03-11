import React, { Component } from 'react'
import { connect } from 'react-redux';

class Answers extends Component {
  render() {
    const { correct, wrong } = this.props;
    const shuffledAnswers = [correct, ...wrong].sort((a, b) => 0.5 - Math.random()); //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
    console.log(shuffledAnswers);
    return (
      // correct
      // ? (
      //   <section data-testid="answer-options">
      //     {shuffledAnswers.map((answer, idx) => (
      //       <button key={idx}>
      //         {answer}
      //       </button>
      //     ))}
      //   </section>
      // )
      // : null
      <p>oi</p>
    )
  }
}


const mapStateToProps = (state) => ({
  trivia: state.results,
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
