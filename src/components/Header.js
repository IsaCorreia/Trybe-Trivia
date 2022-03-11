import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { addImageURL } from '../redux/actions';

class Header extends Component {
  componentDidMount() {
    this.getPicture();
  }

  convertEmailMD5 = ((emailUser) => md5(emailUser).toString());

  getPicture = () => {
    const { emailUser, saveImageURL } = this.props;
    const emailRash = this.convertEmailMD5(emailUser);
    const userPictureURL = `https://www.gravatar.com/avatar/${emailRash}`;
    saveImageURL(userPictureURL);
  };

  render() {
    const { nameUser, urlImage } = this.props;
    return (
      <header>
        <img src={ urlImage } alt={`${nameUser} picture`}/>
        <p>{nameUser}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.player.gravatarEmail,
  nameUser: state.player.name,
  urlImage: state.userPictureURL,
});

const mapDispatchToProps = (dispatch) => ({
  saveImageURL: (URL) => dispatch(addImageURL(URL)),
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  saveImageURL: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  nameUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
