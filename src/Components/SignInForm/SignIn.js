import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SignIn.css";
import SignInError from "./SignInError";
import AuthApiService from "../../Services/auth-api-services";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      }
    };
  }

  static defaultProps = {
    onLoginSuccess: () => {}
  };

  handleUpdatePassword(ev) {
    this.setState({ password: { value: ev, touched: true } });
  }

  handleUpdateEmail(ev) {
    this.setState({ email: { value: ev, touched: true } });
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { email, password } = this.state;
    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
      .then(res => {
        this.setState({
          email: { value: "", touched: false },
          password: { value: "", touched: false }
        });
        this.props.onLoginSuccess(res.payload.user_id);
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  updateEmail = email => {
    this.setState({ email: { value: email, touched: true } });
  };
  updatePassword = password => {
    this.setState({ password: { value: password, touched: true } });
  };

  validateEmail() {
    const email = this.state.email.value;
    if (email < 1) {
      return "An email is required";
    }
  }

  validatePassword() {
    const password = this.state.password.value;
    if (password < 1) {
      return "A password is required";
    }
  }
  validateConfirmPassword() {
    const confirmPassword = this.state.confirmPassword.value;
    if (confirmPassword < 1) {
      return "You must confirm the password";
    }
  }

  render() {
    console.log(this.props);
    const { error } = this.state;
    return (
      <div className='sign-in-form'>
        <form
          action='sign-in'
          className='sign-in'
          onSubmit={this.handleSubmitJwtAuth}
        >
          <div role='alert'>{error && <p className='red'>{error}</p>}</div>
          <legend>Sign In</legend>
          <label htmlFor='user'>Email</label>
          <input
            id='user'
            type='email'
            className='input email'
            onChange={e => this.handleUpdateEmail(e.target.value)}
            //required
          />
          <SignInError
            hasError={this.validateEmail()}
            touched={this.state.email.touched}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='input password'
            onChange={e => this.handleUpdatePassword(e.target.value)}
            //required
            id='password'
          />
          <SignInError
            hasError={this.validatePassword()}
            touched={this.state.password.touched}
          />
          <button className='button'>Sign In</button>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  onLoginSuccess: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
