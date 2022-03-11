import React, { Component } from 'react';
import Answers from '../components/Answers';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';

class Play extends Component {
  componentDidMount = () => {
    const { getQuestions, token, questions } = this.props;
    getQuestions(token);
    // getQuestions('b0d533aef5922425fb5962cbd3f1c79bd7da7599f949d672d3fbdca1f3bbe741') //mock for test
  }

  handleClickNext = () => {
    //remove obj da chave questions (criar action)
    //verifica se a chave está vazia: se sim vai pra tela de feedback
  }

  render() {
    const { questions, questions: {correct_answer, incorrect_answers} } = this.props;
    return (
        questions.length
        ? (
            <>
              <div data-testid="question-category">
              { questions[0].category }
              </div>
              <div data-testid="question-text">
                { questions[0].question }
              </div>
              <Answers
                correct={ questions[0].correct_answer}
                incorrect={questions[0].incorrect_answers }
              />
            </>
          )
          : <p>Carregando...</p>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  token: state.token,
})

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Play);
