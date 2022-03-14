import React, { Component } from 'react';
import PlayerRank from '../components/PlayerRank';

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
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rank.map((item, index) => (
          <PlayerRank info={ item } index={ index } key={ index } />
        ))}
      </>
    );
  }
}

export default Rank;
