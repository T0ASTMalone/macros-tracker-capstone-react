import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import TokenService from '../../Services/token-service';
import MealListContext from '../../context/MealLIstContext';
import MealsContext from '../../context/MealContext';
import IdleService from '../../Services/idle-service';
import logo from '../../screenshots/logo-small.png';

export default class Header extends Component {
  static contextType = MealListContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.clearMeals();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink(signOut) {
    const id = this.context.userId;
    console.log(id);
    return (
      <div className="Header__logged-in">
        {this.props.location.pathname === '/' && TokenService.hasAuthToken() ? (
          <button
            className="to-dash"
            onClick={() => this.props.history.goBack()}
          >
            Back to Dashboard ->
          </button>
        ) : (
          <Link className="login-out" onClick={signOut} to="/">
            Sign out
          </Link>
        )}
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link className="login-out" to="/register">
          Register
        </Link>
        {' | '}
        <Link className="login-out" to="/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  render() {
    console.log(this.props);
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
                <div className="icon-name">
                  <Link className="icon-link" to="/">
                    <img className="icon" alt="icon" src={logo} />
                  </Link>
                  <h1>
                    <Link className="header-title" to="/">
                      MacroFy
                    </Link>
                  </h1>
                </div>

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
