import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';

class Login extends Component {
  render() {
    return (
      <>
        <Link to="/Config">
          <button type="button" data-testid="btn-settings">Configs</button>
        </Link>
        <Form />
      </>
    );
  }
}

export default Login;
