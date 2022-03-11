import React, { Component } from 'react';
import Card from '../components/Card';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';

class Play extends Component {
  componentDidMount = () => {
    const { getQuestions, token } = this.props;
    getQuestions('18ae77a022d944bb0864e3d41cb23ff4c2cf3793843a91757f08cc0e83cb21f1');
  }

  render() {
    return (
      <Card />
    );
  }
}

const mapStateToProps = (state) => ({
  trivia: state.trivia,
  token: state.token,
})

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Play);
