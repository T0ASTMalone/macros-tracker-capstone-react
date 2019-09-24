import React, { Component } from 'react';
import './MealLog.css';
import STORE from '../../store';
import MealItem from '../Mealitem/MealItem';

export default class MealLog extends Component {
  render() {
    console.log(STORE.mealLog);

    return (
      <>
        <section id="meal-log-container">
          {STORE.mealLog.map((meal, i) => {
            const { protein, carbs, fats } = meal;
            const macros = { protein, carbs, fats };
            return (
              <MealItem
                key={i}
                id={i}
                macros={macros}
                name={`Meal ${meal.mealId}`}
              />
            );
          })}
        </section>
      </>
    );
  }
}
