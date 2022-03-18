import React, { Component } from 'react';
import './Rank.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateScore, updateAssertion } from '../redux/actions';

class Rank extends Component {
  //referência
  //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  componentWillUnmount(){
    const { updateScoreGame, updateAssertionGame } =  this.props;
    updateScoreGame(0);
    updateAssertionGame(0);
  }
  
  sortlist = (() => {
    const localStorageItems = localStorage.getItem('ranking');
    const rankList = JSON.parse(localStorageItems);
    rankList.sort(function (a, b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return rankList;
  });

    render() {
      const playerRanking = this.sortlist();
      return (
        <section className="rank-names">
          {
            playerRanking.map(({score, name, picture }, index) => (
              <>
                <p key={ index } />
                <img src={ picture } alt="" />
                <strong><p data-testid={ `player-name-${index}` }>{name}</p></strong>
                <p data-testid={ `player-score-${index}` }>{score}</p>
              </>
          ))}
          <Link to="/">
              <button
                type="button"
                data-testid="btn-go-home"
              >
                Jogar Novamente
              </button>
            </Link>
        </section>
      );
    }
  }

  const mapStateToProps = (state) => ({
  actualPlayerName: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  updateScoreGame: (score) => dispatch(updateScore(score)),
  updateAssertionGame: (assertion) => dispatch(updateAssertion(assertion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
