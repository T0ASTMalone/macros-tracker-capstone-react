import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from '../../Components/utils/PrivateRoute';
import PublicOnlyRoute from '../../Components/utils/PublicOnlyRoute';
import SignInPage from '../../routes/SignIn/SignInPage';
import Register from '../../routes/Register/Register';
import Dashboard from '../../routes/Dashboard/Dashboard';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';

export default class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    console.log('App rendered');
    return (
      <div className="app">
        <header className="app-header">
          <Route path={'/'} component={Header} />
        </header>
        <main className="App_main">
          {this.state.hasError && <p className="red">There was an error!</p>}
          <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <PublicOnlyRoute path={'/sign-in'} component={SignInPage} />
            <PublicOnlyRoute path={'/register'} component={Register} />
            <PrivateRoute path={'/user/:id'} component={Dashboard} />
          </Switch>
        </main>
      </div>
    );
  }
}
