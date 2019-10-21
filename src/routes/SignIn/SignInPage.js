import React, { Component } from "react";
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
    console.log(this.props);
    return (
      <>
        <h2>Login</h2>
        <SignIn onLoginSuccess={this.handleLoginSuccess} />
      </>
    );
  }
}
