import React, { Component } from 'react';
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
    const { meal_id} = meal;
   // const newMeal = { meal_name: 'temp', meal_id, protein, carbs, fats };
    
    const mealFoods = STORE.foods.filter(food => {
      
      return food.meal_id === meal_id});
    console.log(typeof mealFoods)
    
    this.context.addFood(mealFoods);
    //this.context.addMeal(newMeal);
    //this.props.history.push('/user/:id/dashboard');
    this.props.hide('showMealLog');
  };

  render() {
    return (
      <div className="container">
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
