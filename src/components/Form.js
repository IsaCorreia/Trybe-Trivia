import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUserInfo } from '../redux/actions/index';

class Form extends Component {
  state = {
    isButtonDisabled: true,
  };

  buttonEnabler = () => {
    const { nome, email } = this.state;
    const isValidEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    console.log(this.state);
    if (isValidEmail && nome) {
      return this.setState({ isButtonDisabled: false });
    }
    return this.setState({ isButtonDisabled: true });
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value }, () => this.buttonEnabler());
  };

  render() {
    const { isButtonDisabled, nome, email } = this.state;
    const { dispatchUserInfo } = this.props;
    return (
      <form>
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
          onClick={ () => dispatchUserInfo(nome, email) }
        >
          Play
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  dispatchUserInfo: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  dispatchUserInfo: (nome, email) => dispatch(saveUserInfo(nome, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
