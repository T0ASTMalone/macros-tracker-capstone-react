import React, { Component } from 'react';
import './MealLog.css';
import STORE from '../../store';
import MealItem from '../Mealitem/MealItem';

export default class MealLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealLog: []
    };
  }

  componentDidMount() {
    const meals = STORE.mealLog;
    this.setState({ mealLog: [...meals] });
  }

  render() {
    return (
      <>
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
                  name={`Meal ${meal.meal_id}`}
                />
                <button className="add-meal-log-item">Add</button>
              </div>
            );
          })}
        </section>
      </>
    );
  }
}
