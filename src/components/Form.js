import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchTrivia, saveUserInfo } from '../redux/actions/index';

class Form extends Component {
  state = {
    isButtonDisabled: true,
  };

  buttonEnabler = () => {
    const { nome, email } = this.state;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    if (isValidEmail && nome) {
      return this.setState({ isButtonDisabled: false });
    }
    return this.setState({ isButtonDisabled: true });
  };

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value }, () => this.buttonEnabler());
  };

  onClicked = async () => {
    const { dispatchUserInfo, dispatchFetchTrivia } = this.props;
    const { nome, email } = this.state;
    dispatchUserInfo(nome, email);
    await dispatchFetchTrivia();
    this.setState({ isLoggedIn: true });
  }

  render() {
    const { isButtonDisabled, isLoggedIn } = this.state;
    return (
      <form>
        {isLoggedIn && <Redirect to="/play" />}
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="nome"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          E-mail
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ isButtonDisabled }
          onClick={ this.onClicked }
        >
          Play
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  dispatchUserInfo: PropTypes.func.isRequired,
  dispatchFetchTrivia: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUserInfo: (nome, email) => dispatch(saveUserInfo(nome, email)),
  dispatchFetchTrivia: () => dispatch(fetchTrivia()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
