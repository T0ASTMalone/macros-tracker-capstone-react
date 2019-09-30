import React, { Component } from 'react';
import MealContext from '../../context/MealContext';
import { Redirect } from 'react-router-dom';
import uuid from 'uuid';
import config from '../../config';
import MacrosService from '../../Services/macros-services';

export default class AddFoodLogItem extends Component {
  state = {
    servings: {
      value: '',
      touched: false
    },
    added: false
  };

  static contextType = MealContext;

  updateServings = servings => {
    this.setState({ servings: { value: servings, touched: true } });
  };

  addFood = food => {
    MacrosService.totalFoodMacros(food);
    this.context.addFood(food);
    this.setState({ added: true });
  };

  handleExisting = () => {
    let food_id = uuid();
    const { food_name, protein, carbs, fats } = this.props.food;
    const servings = this.state.servings.value;
    const newFood = { food_id, food_name, protein, carbs, fats, servings };
    this.addFood(newFood);
  };

  makeSearchFood = food => {
    const food_id = uuid();
    let { protein, carbs, fat } = food.nutrition;
    let macros = { protein, carbs, fat };

    Object.keys(macros).map(key => {
      return (macros[key] = macros[key].substr(0, macros[key].indexOf('g')));
    });

    const newFood = {
      food_id,
      food_name: food.title,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fat,
      servings: this.state.servings.value
    };
    this.addFood(newFood);
  };

  handleSearched = () => {
    const url =
      config.API_ENDPOINT + `${this.props.foodId}?apiKey=${config.API_KEY}`;
    fetch(url)
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(resJson => this.makeSearchFood(resJson));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.food === undefined
      ? this.handleSearched()
      : this.handleExisting();
  };

  render() {
    if (this.state.added) {
      return <Redirect to="/user/:id/add-meal" />;
    }
    return (
      <form action="add-food" className="add-food" onSubmit={this.handleSubmit}>
        <label htmlFor="servings">Servings</label>
        <input
          onChange={e => this.updateServings(e.target.value)}
          type="number"
          id="servings"
          min="1"
          required
          name="servings"
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}
