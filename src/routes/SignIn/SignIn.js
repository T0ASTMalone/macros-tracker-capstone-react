import React from 'react';
import './SignIn.css';

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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={e => this.handleUpdatePassword(e.target.value)}
            //required
            id="password"
          />
          <button>Sign In</button>
        </form>
      </div>
    );
  }
}
