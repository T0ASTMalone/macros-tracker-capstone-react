import React from 'react';
import './TodaysMeals.css';
import MealItem from '../../Components/Mealitem/MealItem';
import { Redirect } from 'react-router-dom';
import MealListContext from '../../context/MealLIstContext';

export default class TodaysMeals extends React.Component {
  state = {
    addMeal: false
  };

  static contextType = MealListContext;

  handleRedirect = () => {
    this.setState({ addMeal: true });
  };

  handleDelete = mealId => {
    this.context.deleteMeal(mealId);
  };

  render() {
    const todaysMeals = this.context.mealList || [];
    if (this.state.addMeal === true) {
      return <Redirect to="/user/:id/add-meal" push />;
    }

    return (
      <>
        <h2 className="section-title">Todays Meals</h2>
        <div className="todays-meals">
          {todaysMeals < 1 ? (
            <div className="todays-meal-item empty">
              <button className="empty-button" onClick={this.handleRedirect}>
                +
              </button>
            </div>
          ) : (
            todaysMeals.map((meal, i) => {
              const { protein, carbs, fats } = meal;
              const macros = { protein, carbs, fats };
              return (
                <div key={i} className="todays-meal-item">
                  <MealItem id={i} macros={macros} name={meal.meal_name} />
                  <button
                    className="delete-todays-meal"
                    onClick={() => this.handleDelete(meal.meal_id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}

          <button
            className="button add-meal-button"
            onClick={this.handleRedirect}
          >
            Add Meal
          </button>
        </div>
      </>
    );
  }
}
