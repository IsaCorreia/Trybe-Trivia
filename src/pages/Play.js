import React, { Component } from 'react';
import Card from '../components/Card';
import { connect } from 'react-redux';

class Play extends Component {
  render() {
    return (
      <Card />
    );
  }
}

const mapDispatchToProps = () => ({

})

export default connect(null, mapDispatchToProps)(Play);
