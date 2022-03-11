import React, { Component } from 'react'
import { connect } from 'react-redux';

class Card extends Component {
  render() {
    return (
      <>
        <div>Header</div>
        <div>CardQuestions</div>
        <div>CardAnswers</div>
        <div>Timer</div>
        <div>Next Button</div>
      </>
    )
  }
}


const mapStateToProps = (state) => ({
  trivia: state.results,
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Card);
