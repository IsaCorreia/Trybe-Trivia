import React, { Component } from 'react';
import Card from '../components/Card';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';

class Play extends Component {
  componentDidMount = () => {
    const { getQuestions, token } = this.props;
    getQuestions(token);
  }

  render() {
    return (
      <Card />
    );
  }
}

const mapStateToProps = (state) => ({
  trivia: state.results,
  token: state.token,
})

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Play);
