import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Config extends Component {
  render() {
    return (
      <>
        <p data-testid="settings-title">Config</p>
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
      </>
    );
  }
}

export default Config;
