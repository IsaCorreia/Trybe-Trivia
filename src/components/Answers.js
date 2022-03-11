import React, { Component } from 'react'
import { connect } from 'react-redux';

class Answers extends Component {
  render() {
    const { correct, incorrect } = this.props;
    return (
      correct
      ? (
        <>
        <div>CardQuestions</div>
        <div>CardAnswers</div>
        <div>Timer</div>
        <div>Next Button</div>
      </>
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
