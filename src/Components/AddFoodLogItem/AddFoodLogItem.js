import React, { Component } from 'react';
import MealContext from '../../context/MealContext';
import { Redirect } from 'react-router-dom';
import uuid from 'uuid';

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

  handleSubmit = e => {
    e.preventDefault();
    let food_id = uuid();
    
    const { food_name, protein, carbs, fats } = this.props.food;
    const servings = this.state.servings.value;
    const food = { food_id, food_name, protein, carbs, fats, servings };
    console.log(food);
    this.context.addFood(food);
    this.setState({ added: true });
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
