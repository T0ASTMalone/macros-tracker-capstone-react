import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import TokenService from '../../Services/token-service';
import MealListContext from '../../context/MealLIstContext';

export default class Header extends Component {
  static contextType = MealListContext;
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.clearMeals();
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/register">Register</Link>
        <Link to="/sign-in">Log in</Link>
      </div>
    );
  }

  render() {
    return (
      <>
        <nav className="header">
          <h1>
            <Link to="/">MacroFy</Link>
          </h1>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      </>
    );
  }
}
