import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Answers from '../components/Answers';
import { fetchQuestions } from '../redux/actions';

class Play extends Component {
  componentDidMount = () => {
    const { getQuestions, token } = this.props;
    getQuestions(token);
    // getQuestions('59d386d6a84942f134f4ed9eb0910e14975ef117237b34dd690eef4e35636fe3') //mock for test
  }

  handleClickNext = () => {
    // remove obj da chave questions (criar action)
    // verifica se a chave está vazia: se sim vai pra tela de feedback
  }

  render() {
    const { questions } = this.props;
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
              correct={ questions[0].correctAnswer }
              wrong={ questions[0].incorrectAnswers }
            />
          </>
        )
        : <p>Carregando...</p>
    );
  }
}

Play.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
