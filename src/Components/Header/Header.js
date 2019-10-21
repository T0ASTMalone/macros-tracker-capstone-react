import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import TokenService from '../../Services/token-service';
import MealListContext from '../../context/MealLIstContext';
import MealsContext from '../../context/MealContext';
import IdleService from '../../Services/idle-service';

export default class Header extends Component {
  static contextType = MealListContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.clearMeals();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink(logout) {
    return (
      <div className="Header__logged-in">
        <Link className="login-out" onClick={logout} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link className="login-out" to="/register">
          Register
        </Link>{' '}
        <Link className="login-out" to="/sign-in">
          Log in
        </Link>
      </div>
    );
  }

  render() {
    return (
      <MealsContext.Consumer>
        {MealsContext => {
          const handleLogout = () => {
            MealsContext.clearFoods();
            this.handleLogoutClick();
          };
          return (
            <>
              <nav className="header">
                <h1>
                  <Link className="header-title" to="/">
                    MacroFy
                  </Link>
                </h1>
                {TokenService.hasAuthToken()
                  ? this.renderLogoutLink(handleLogout)
                  : this.renderLoginLink()}
              </nav>
            </>
          );
        }}
      </MealsContext.Consumer>
    );
  }
}
