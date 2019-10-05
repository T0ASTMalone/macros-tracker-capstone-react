import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MealLog.css';
import STORE from '../../store';
import MealItem from '../Mealitem/MealItem';
import MealsContext from '../../context/MealContext';

export default class MealLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealLog: []
    };
  }

  static contextType = MealsContext;

  componentDidMount() {
    const meals = STORE.mealLog;
    this.setState({ mealLog: [...meals] });
  }

  handleAddMeal = meal => {
    const { meal_id } = meal;
    const foods = JSON.parse(JSON.stringify(STORE.foods));
    const mealFoods = foods.filter(food => {
      return food.meal_id === meal_id;
    });
    this.context.addFood(mealFoods);
    this.props.hide('showMealLog');
  };

  closeWindow = () => {
    this.props.hide('showMealLog');
  };

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <button className="close-window" onClick={this.closeWindow}>
          X
        </button>
        <section id="meal-log-container">
          {this.state.mealLog.map((meal, i) => {
            const { protein, carbs, fats } = meal;
            const macros = { protein, carbs, fats };
            return (
              <div key={i} className="meal-log-item">
                <MealItem
                  key={i}
                  id={i}
                  macros={macros}
                  name={meal.meal_name}
                />
                <button
                  className="add-meal-log-item"
                  onClick={() => this.handleAddMeal(meal)}
                >
                  Add
                </button>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}


MealLog.propTypes = {
  hide: PropTypes.func.isRequired
}