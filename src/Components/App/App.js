import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
//import PrivateRoute from '../../utils/PrivateRoute';
//import PublicOnlyRoute from '../../utils/PublicOnlyRoute';
import SignIn from '../../routes/SignIn/SignIn';
import Register from '../../routes/Register/Register';
import Dashboard from '../../routes/Dashboard/Dashboard';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';

export default class App extends React.Component {
  render() {
    console.log(process.env)
    return (
      <div className="app">
        <header className="app-header">
          <Header />
        </header>
        <main className="App_main">
          <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <Route path={'/user/:id'} component={Dashboard} />
            <Route exact path={'/sign-in'} component={SignIn} />
            <Route exact path={'/register'} component={Register} />
          </Switch>
        </main>
      </div>
    );
  }
}
