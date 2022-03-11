import React, { Component } from 'react';
import Card from '../components/Card';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';

class Play extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    const { getQuestions, token } = this.props;
    getQuestions(token);
  }

  render() {
    const { questions, token } = this.props;
    return (
      <>
        <Card />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state,
  token: state.token,
})

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Play);
