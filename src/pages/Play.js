import React, { Component } from 'react';
import Answers from '../components/Answers';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';

class Play extends Component {
  componentDidMount = () => {
    const { getQuestions, token, questions } = this.props;
    // getQuestions(token);
    getQuestions('59d386d6a84942f134f4ed9eb0910e14975ef117237b34dd690eef4e35636fe3') //mock for test
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
                correct={ [questions[0].correct_answer]}
                wrong={questions[0].incorrect_answers }
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
