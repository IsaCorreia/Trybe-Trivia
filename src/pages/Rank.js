import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerRank from '../components/PlayerRank';
import './Rank.css';

const mockStorageRank = [
  {
    name: 'fulano',
    score: 1,
    picture: 'fulano@email.com',
  },
];

class Rank extends Component {
  state = {
    ranking: mockStorageRank,
  };

  render() {
    const { ranking } = this.state;
    console.log(ranking);
    return (
      <div className="main">
        <section className="rank-container">
          <h1 data-testid="ranking-title">Ranking</h1>
          {ranking.map((item, index) => (
            <PlayerRank info={ item } index={ index } key={ index } />
          )) }
          <Link to="/">
            <button type="button" data-testid="btn-go-home">Jogar novamente</button>
          </Link>
        </section>
      </div>
    );
  }
}

export default Rank;
