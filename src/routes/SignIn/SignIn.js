import React from 'react';
import './SignIn.css';
import SignInError from './SignInError';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        touched: false
      },
      password: {
        value: '',
        touched: false
      }
    };
  }

  handleUpdatePassword(ev) {
    this.setState({ password: { value: ev, touched: true } });
  }

  handleUpdateEmail(ev) {
    this.setState({ email: { value: ev, touched: true } });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.history.push('/user/:id');
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
      return 'An email is required';
    }
  }

  validatePassword() {
    const password = this.state.password.value;
    if (password < 1) {
      return 'A password is required';
    }
  }
  validateConfirmPassword() {
    const confirmPassword = this.state.confirmPassword.value;
    if (confirmPassword < 1) {
      return 'You must confirm the password';
    }
  }

  render() {
    return (
      <div>
        <form action="sign-in" onSubmit={this.handleSubmit}>
          <legend>Sign In</legend>
          <label htmlFor="user">Email</label>
          <input
            id="user"
            type="email"
            onChange={e => this.handleUpdateEmail(e.target.value)}
            //required
          />
          <SignInError
            hasError={this.validateEmail()}
            touched={this.state.email.touched}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={e => this.handleUpdatePassword(e.target.value)}
            //required
            id="password"
          />
          <SignInError
            hasError={this.validatePassword()}
            touched={this.state.password.touched}
          />
          <button>Sign In</button>
        </form>
      </div>
    );
  }
}
