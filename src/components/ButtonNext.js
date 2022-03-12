import React, { Component } from 'react';

class ButtonNext extends Component {
  handleClickNext = () => {
    console.log('next');
    // remove obj da chave questions (criar action)
    // verifica se a chave está vazia: se sim vai pra tela de feedback
  }
  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleClickNext() }>
          Próxima
      </button>
    );
  }
}

export default ButtonNext;