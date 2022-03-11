import React, { Component } from 'react'
import { connect } from 'react-redux';

class Answers extends Component {
  render() {
    const { correct, incorrect } = this.props;
    const shuffledAnswers = [correct, ...incorrect].sort((a, b) => 0.5 - Math.random()); //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
    return (
      correct
      ? (
        shuffledAnswers.map((answer) => (
          <button>
            {answer}
          </button>
        ))
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
