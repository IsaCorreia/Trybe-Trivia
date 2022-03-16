import PropTypes from 'prop-types';
import React, { Component } from 'react';

class PlayerRank extends Component {
  render() {
    const { info: { name, gravatarEmail, score }, index } = this.props;
    return (
      <section className="rank-names">
        <img src={ gravatarEmail } alt="" />
        <strong><p data-testid={ `player-name-${index}` }>{name}</p></strong>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </section>
    );
  }
}

PlayerRank.propTypes = {
  info: PropTypes.shape.isRequired,
  index: PropTypes.number.isRequired,
};

export default PlayerRank;
