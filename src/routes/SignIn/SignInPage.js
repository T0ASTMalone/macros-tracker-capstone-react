import React, { Component } from "react";
import "./SignInPage.css";
import SignIn from "../../Components/SignInForm/SignIn";

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
    this.props.refresh();
  };

  render() {
    return (
      <div className='sign-in-page'>
        <div className='sign-in-container'>
          <h2 className='sign-in-form-name'>Sign In</h2>
          <SignIn onLoginSuccess={this.handleLoginSuccess} />
        </div>
      </div>
    );
  }
}
