import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <>
        <nav className="header">
          <h1>
            <Link to="/">MacroFy</Link>
          </h1>
          <div className="register-sing-in">
            <Link to={'/sign-in'}>Sign In</Link> {'|'}
            <Link to={'/register'}>Register</Link>
          </div>
        </nav>
      </>
    );
  }
}
