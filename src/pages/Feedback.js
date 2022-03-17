import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    this.saveInfoLocalStore();
  }

  getMessagesFeedback = (() => {
    const { questionAssertions } = this.props;
    const MIN_ASSERTIONS = 2;
    if (questionAssertions <= MIN_ASSERTIONS) {
      return 'Could be better...';
    }
    return 'Well Done!';
  })

  saveInfoLocalStore = () => {
    const {
      score,
      userPicture,
      playerName,
    } = this.props;
    const ranking = {
      name: playerName,
      score,
      picture: userPicture,
    };
    const localStorageItems = localStorage.getItem('ranking');
    const results = JSON.parse(localStorageItems);
    results.push(ranking)
    localStorage.setItem('ranking', JSON.stringify(results));
  }

  render() {
    const { questionAssertions: assertions, score } = this.props;
    const msgFeedback = this.getMessagesFeedback();
    return (
      <>
        <Header />
        <div className="container" id="feedback-Screen">
          <div className="feedback">
            <h1 data-testid="feedback-text">{ msgFeedback }</h1>
            <br />
            <h3>
              Pontuação
            </h3>
            <h1>
              <span data-testid="feedback-total-score">{ score }</span>
            </h1>
            <br />
            <h3>
              Perguntas corretas
            </h3>
            <h1>
              <span data-testid="feedback-total-question">{ assertions }</span>
            </h1>
          </div>
          <div className="button-container">
            <Link to="/">
              <button
                type="button"
                data-testid="btn-play-again"
              >
                Jogar novamente
              </button>
            </Link>
            <Link to="rank">
              <button
                type="button"
                data-testid="btn-ranking"
              >
                Ver ranking
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questionAssertions: state.player.assertions,
  score: state.player.score,
  userPicture: state.userPictureURL,
  playerName: state.player.name,
});

Feedback.propTypes = {
  questionAssertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  userPicture: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
