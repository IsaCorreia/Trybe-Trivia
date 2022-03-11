import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { addImageURL } from '../redux/actions';

class Header extends Component {
  componentDidMount() {
    this.getPicture();
  }

  convertEmailMD5 = ((emailUser) => {
    return md5(emailUser).toString();
  });
  
  getPicture = () => {
    const { emailUser, saveImageURL } = this.props;
    const emailRash = this.convertEmailMD5(emailUser);
    const userPictureURL = `https://www.gravatar.com/avatar/${emailRash}`;
    saveImageURL(userPictureURL);
  };

  render() {
    const { emailUser, nameUser } = this.props;
    return (
      <header>
        <p>{emailUser}</p>
        <p>{nameUser}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.player.gravatarEmail,
  nameUser: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  saveImageURL: (URL) => dispatch(addImageURL(URL)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
