import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import logoTrivia from '../trivia.png';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <main>
        <section>
          <img src={ logoTrivia } alt="Logo Trivia" />
        </section>
        <section id="form">
          <Link to="/Config">
            <button type="button" data-testid="btn-settings">Configs</button>
          </Link>
          <Form />
        </section>
      </main>
    );
  }
}

export default Login;
