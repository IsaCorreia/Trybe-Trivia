import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Answers from '../components/Answers';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { fetchQuestions, setButtonVisibility } from '../redux/actions';
import ButtonNext from '../components/ButtonNext';
import './Play.css';

class Play extends Component {
  state = {
    time: 30,
    disableButtons: false,
    classCorrect: '',
    classWrong: '',
  }

  componentDidMount = () => {
    const { getQuestions, token } = this.props;
    getQuestions(token);
    // getQuestions('59d386d6a84942f134f4ed9eb0910e14975ef117237b34dd690eef4e35636fe3') //mock for test
    this.handleTimer();
  }

  setColorButton = (correct = '', wrong = '') => {
    this.setState({
      classCorrect: correct,
      classWrong: wrong,
    });
  }

  setAnswerDisable = () => {
    this.setState({ disableButtons: true });
  }

  handleTimer = () => {
    this.setState({ disableButtons: false });
    const { isNextVisible } = this.props;
    this.setState({ time: 10 });
    const INTERVAL_IN_MILISEC = 1000;
    const TOTAL_TIME = 10000;
    const timer = setInterval(() => this.setState((prevState) => ({
      time: prevState.time - 1,
    })), INTERVAL_IN_MILISEC);
    setTimeout(() => {
      clearInterval(timer);
      isNextVisible(false);
      this.setState({ disableButtons: true });
    }, TOTAL_TIME);
  }

  render() {
    const { questions, history } = this.props;
    const { time, disableButtons, classCorrect, classWrong } = this.state;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions.length && questions[0];

    return (
      questions.length
        ? (
          <>
            <Header />
            <section className="mainPlay">
              <section className="card">
                <section className="head-theme" data-testid="question-category">
                  { questions[0].category }
                </section>
                <section className="question" data-testid="question-text">
                  { questions[0].question }
                </section>
                <Answers
                  correct={ correctAnswer }
                  wrong={ incorrectAnswers }
                  disable={ disableButtons }
                  classWrong={ classWrong }
                  classCorrect={ classCorrect }
                  setColorButton={ this.setColorButton }
                  setAnswerDisable={ this.setAnswerDisable }
                />
              </section>
              <ButtonNext
                history={ history }
                resetTimer={ this.handleTimer }
                setColorButton={ this.setColorButton }
              />
              {questions.length
              && <Timer
                time={ time }
              />}
            </section>
          </>
        )
        : (
          <div className="load-container">
            {/* https://cssfx.netlify.app/ */}
            <div className="balls">
              <div />
              <div />
              <div />
            </div>
          </div>
        )
    );
  }
}

Play.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  isNextVisible: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  isNextVisible: (status) => dispatch(setButtonVisibility(status)),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
