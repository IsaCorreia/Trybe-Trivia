import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import logoTrivia from '../trivia.png';

import './Login.css';

class Login extends Component {
  render() {
    return (
      <main>
        <section className="logo-container">
          <img src={ logoTrivia } alt="Logo Trivia" />
          <Link to="/Config">
            <button type="button" data-testid="btn-settings">
              <img
                className="config"
                src="https://img.icons8.com/ios/500/000000/services--v1.png"
                alt="Configurações do jogo"
              />
            </button>
          </Link>
        </section>
        <Form />
      </main>
    );
  }
}

export default Login;
