import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import PrivateRoute from '../../utils/PrivateRoute';
//import PublicOnlyRoute from '../../utils/PublicOnlyRoute';
import SignIn from '../../routes/SignIn/SignIn';
import Register from '../../routes/Register/Register';
import Dashboard from '../../routes/Dashboard/Dashboard';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
//import AddMeal from '../../routes/AddMeal/AddMeal';
//import FoodLog from '../FoodLog/FoodLog';
//import MealLog from '../MealLog/MealLog';
//import AddFoodItem from '../AddFoodItem/AddFoodItem';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header>
          <Header />
        </header>
        <main className="App_main">
          <Switch>
            {/*<Route path={'/user/:id/add-food'} component={AddFoodItem} />
            <Route path={'/user/:id/meal-log'} component={MealLog} />
            <Route path={'/user/:id/food-log'} component={FoodLog} />
    <Route path={'/user/:id/add-meal'} component={AddMeal} />*/}
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
