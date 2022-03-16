import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerRank from '../components/PlayerRank';
import './Rank.css';

const mockStorageRank = [
  {
    name: 'fulano',
    score: 1,
    gravatarEmail: 'fulano@email.com',
  },
  {
    name: 'cliclano',
    score: 2,
    gravatarEmail: 'cliclano@email.com',
  },
];

class Rank extends Component {
  state = {
    rank: mockStorageRank,
  };

  render() {
    const { rank } = this.state;
    return (
      <div className="">
        <section>
          <h1 data-testid="ranking-title">Ranking</h1>
          {rank.map((item, index) => (
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
