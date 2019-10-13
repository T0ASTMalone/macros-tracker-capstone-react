import React, { Component } from 'react';
import SignIn from '../../Components/SignInForm/SignIn';

export default class SignInPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = id => {
    console.log('props: ', this.props);
    const { location, history } = this.props;
    const destination = (location.state || {}).from || `/user/${id}`;
    history.push(destination);
  };

  render() {
    return (
      <>
        <h2>Login</h2>
        <SignIn onLoginSuccess={this.handleLoginSuccess} />
      </>
    );
  }
}
