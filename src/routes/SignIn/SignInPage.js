import React, { Component } from "react";
import SignIn from "../../Components/SignInForm/SignIn";
import "./SignInPage.css";

export default class SignInPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = id => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || `/user/${id}`;
    history.push(destination);
  };

  render() {
    return (
      <div className='sign-in-page'>
        <h2>Sign In</h2>
        <SignIn onLoginSuccess={this.handleLoginSuccess} />
      </div>
    );
  }
}
