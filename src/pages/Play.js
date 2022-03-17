import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Answers from '../components/Answers';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { fetchQuestions } from '../redux/actions';
import ButtonNext from '../components/ButtonNext';
import './Play.css';

class Play extends Component {
  state = {
    time: 30,
    disableButtons: false,
  }

  componentDidMount = () => {
    const { getQuestions, token } = this.props;
    getQuestions(token);
    // getQuestions('59d386d6a84942f134f4ed9eb0910e14975ef117237b34dd690eef4e35636fe3') //mock for test
    this.handleTimer();
  }

  handleTimer = () => {
    this.setState({ time: 30 });
    const INTERVAL_IN_MILISEC = 1000;
    const TOTAL_TIME = 30000;
    const timer = setInterval(() => this.setState((prevState) => ({
      time: prevState.time - 1,
    })), INTERVAL_IN_MILISEC);
    setTimeout(() => {
      clearInterval(timer);
      this.setState({ disableButtons: true });
    }, TOTAL_TIME);
  }

  render() {
    const { questions, history } = this.props;
    const { time, disableButtons } = this.state;
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
                />
              </section>
              <ButtonNext
                history={ history }
                resetTimer={ this.handleTimer }
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
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
