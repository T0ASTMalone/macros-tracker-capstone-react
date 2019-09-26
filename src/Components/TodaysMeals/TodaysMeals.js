import React from 'react';
import './TodaysMeals.css';
import MealItem from '../../Components/Mealitem/MealItem';
import STORE from '../../store';

export default class TodaysMeals extends React.Component {
  handleClick = () => {
    this.props.history.push('/user/:user/add-meal');
    console.log(this.props.history);
  };
  render() {
    return (
      <>
        <h2 className="section-title">Todays Meals</h2>
        <div className="todays-meals">
          {/* <MealItem />
          <MealItem />
         <MealItem />*/}

          {STORE.todaysMeals.map((meal, i) => {
            const { protein, carbs, fats } = meal;
            const macros = { protein, carbs, fats };
            return (
              <div key={i} className="todays-meal-item">
                <MealItem
                  id={i}
                  macros={macros}
                  name={`Meal ${meal.meal_id}`}
                />
                <button className="delete-todays-meal">Delete</button>
              </div>
            );
          })}
          <button className="button add-meal-button" onClick={this.handleClick}>
            Add Meal
          </button>
        </div>
      </>
    );
  }
}
