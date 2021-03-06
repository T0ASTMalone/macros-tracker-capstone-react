import React, { Component } from 'react';
import './AddFoodLogItem.css';
import PropTypes from 'prop-types';
import MealContext from '../../context/MealContext';
import uuid from 'uuid';
import config from '../../config';
import MacrosService from '../../Services/macros-services';

export default class AddFoodLogItem extends Component {
  state = {
    servings: {
      value: '',
      touched: false
    }
  };

  static contextType = MealContext;

  updateServings = servings => {
    if (this.props.updateServings) {
      let id = this.props.food.id;
      this.props.updateServings(id, servings);
    }
    this.setState({ servings: { value: servings, touched: true } });
  };

  addFood = food => {
    MacrosService.totalFoodMacros(food);
    const foodArr = [food];
    this.context.addFood(foodArr);
  };

  handleExisting = () => {
    const {
      id,
      food_name,
      protein = '0',
      carbs = '0',
      fats = '0'
    } = this.props.food;
    const servings = this.state.servings.value;
    const newFood = {
      id,
      food_name,
      protein,
      carbs,
      fats,
      servings,
      foodKey: uuid()
    };
    this.addFood(newFood);
    this.props.hide('showFoodLog');
  };

  makeSearchFood = food => {
    let { protein = '0g', carbs = '0g', fat = '0g' } = food.nutrition;
    let macros = { protein, carbs, fat };
    Object.keys(macros).map(key => {
      return (macros[key] = macros[key].substr(0, macros[key].indexOf('g')));
    });

    const newFood = {
      id: uuid(),
      food_name: food.title,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fat,
      servings: this.state.servings.value,
      foodKey: uuid()
    };
    this.addFood(newFood);
    this.props.hide
      ? this.props.hide()
      : this.props.hideMeal(this.props.food.meal_id);
  };

  handleSearched = () => {
    const url =
      config.FOOD_API_ENDPOINT +
      `${this.props.foodId}?apiKey=${config.API_KEY}`;
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
    let editMode = this.props.edit || false;
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
          className="input"
          placeholder={editMode ? this.props.food.servings : ''}
        />
        {editMode ? (
          <></>
        ) : (
          <button className="add-food-button button" type="submit">
            Add
          </button>
        )}
      </form>
    );
  }
}

AddFoodLogItem.propTypes = {
  food: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    food_name: PropTypes.string,
    meal_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    servings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    protein: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    carbs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fats: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};
