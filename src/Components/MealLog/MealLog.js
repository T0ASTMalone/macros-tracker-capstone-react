import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MealLog.css';
import MealItem from '../Mealitem/MealItem';
import MealsContext from '../../context/MealContext';
import MacroFyServices from '../../Services/macrofy-api-service';
import FoodLog from '../FoodLog/FoodLog';

export default class MealLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealLog: []
    };
  }

  static contextType = MealsContext;

  async componentDidMount() {
    const id = this.context.userId;
    const meals = await MacroFyServices.getAllMeals(id);
    this.setState({ mealLog: [...meals] });
  }

  async handleAddMeal(meal) {
    const { meal_id } = meal;
    const mealFoods = await MacroFyServices.getMealFoods(meal_id);
    this.context.addFood(mealFoods);
    this.props.hide();
  }

  async showMealFoods(id) {
    const foods = await MacroFyServices.getMealFoods(id);
    this.setState({ [id]: foods });
  }

  hideMealFoods(id) {
    this.setState({ [id]: null });
  }

  render() {
    return (
      <div className="container">
        <section id="meal-log-container">
          {this.state.mealLog.length > 0 ? (
            this.state.mealLog.map((meal, i) => {
              const { date_added, protein, carbs, fats, meal_name } = meal;
              const macros = { protein, carbs, fats };
              return (
                <div key={i} className="meal-log-item">
                  <div className="meal">
                    <div className="meal-info">
                      <MealItem
                        key={i}
                        id={i}
                        macros={macros}
                        name={meal_name}
                        dateAdded={date_added}
                      />
                      <button
                        className="add-meal-log-item"
                        onClick={() => this.handleAddMeal(meal)}
                      >
                        Add
                      </button>
                    </div>
                    {this.state[meal.meal_id] ? (
                      <button onClick={() => this.hideMealFoods(meal.meal_id)}>
                        Hide Meal Foods
                      </button>
                    ) : (
                      <button onClick={() => this.showMealFoods(meal.meal_id)}>
                        Show Meal Foods
                      </button>
                    )}
                  </div>

                  <div className="meal-foods">
                    {this.state[meal.meal_id] ? (
                      <FoodLog
                        className={
                          this.state[meal.meal_id].hide ? 'hidden' : 'none'
                        }
                        foods={this.state[meal.meal_id]}
                        hide={this.props.hide}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </section>
      </div>
    );
  }
}

MealLog.propTypes = {
  hide: PropTypes.func.isRequired
};
