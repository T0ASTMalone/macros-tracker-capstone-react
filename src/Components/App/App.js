import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "../../Components/utils/PrivateRoute";
import PublicOnlyRoute from "../../Components/utils/PublicOnlyRoute";
import SignInPage from "../../routes/SignIn/SignInPage";
import Register from "../../routes/Register/Register";
import Dashboard from "../../routes/Dashboard/Dashboard";
import Header from "../Header/Header";
import LandingPage from "../../routes/LandingPage/LandingPage";

export default class App extends React.Component {
  state = {
    refresh: 0
  };

  refresh = () => {
    this.setState({ refresh: Math.random() });
  };

  render() {
    return (
      <div className='app'>
        <header className='app-header'>
          <Header refresh={this.refresh} />
        </header>
        <main className='App_main'>
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <PrivateRoute path={"/user/:id"} component={Dashboard} />
            <PublicOnlyRoute
              exact
              path={"/sign-in"}
              component={SignInPage}
              refresh={this.refresh}
            />
            <PublicOnlyRoute
              exact
              path={"/register"}
              component={Register}
              refresh={this.refresh}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
