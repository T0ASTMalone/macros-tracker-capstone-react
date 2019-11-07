import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MealLog.css';
import MealItem from '../Mealitem/MealItem';
import MealsContext from '../../context/MealContext';
import MacroFyServices from '../../Services/macrofy-api-service';
import FoodLog from '../FoodLog/FoodLog';
import EditMeal from '../EditMeal/EditMeal';

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

  async handleEditMeal(id) {
    await this.showMealFoods(id);
    this.setState({ [id]: { foods: this.state[id], edit: true } });
  }

  hideMealFoods(id) {
    this.setState({ [id]: null });
  }

  render() {
    return (
      <div className="container">
        <section id="meal-log-container" className="meal-log-container">
          {this.state.mealLog ? (
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
                      <div className="meal-buttons">
                        <button
                          className="add-meal-log-item button"
                          onClick={() => this.handleAddMeal(meal)}
                        >
                          Add
                        </button>
                        <button
                          className="edit-meal button"
                          onClick={() => this.handleEditMeal(meal.meal_id)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    {this.state[meal.meal_id] ? (
                      <button
                        className="show-foods"
                        onClick={() => this.hideMealFoods(meal.meal_id)}
                      >
                        <img
                          className="chevron"
                          alt="chevron down"
                          src="https://img.icons8.com/material-rounded/24/000000/chevron-up.png"
                        />
                      </button>
                    ) : (
                      <button
                        className="show-foods"
                        onClick={() => this.showMealFoods(meal.meal_id)}
                      >
                        <img
                          className="chevron"
                          src="https://img.icons8.com/material-rounded/60/000000/chevron-down.png"
                          alt="chevron down"
                        />
                      </button>
                    )}
                  </div>

                  <div className="meal-foods">
                    {this.state[meal.meal_id] ? (
                      this.state[meal.meal_id].edit ? (
                        <EditMeal
                          className={
                            this.state[meal.meal_id].hide ? 'hidden' : 'none'
                          }
                          meal={this.state[meal.meal_id]}
                          hide={this.props.hide}
                        />
                      ) : (
                        <>
                          <FoodLog
                            className={
                              this.state[meal.meal_id].hide ? 'hidden' : 'none'
                            }
                            foods={this.state[meal.meal_id]}
                            hide={this.props.hide}
                            edit={false}
                          />
                        </>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-log">
              <p>
                Nothing to see here. Start adding meals by searching for foods
                or creating new ones. Then clicking the create meal button.
              </p>
            </div>
          )}
        </section>
      </div>
    );
  }
}

MealLog.propTypes = {
  hide: PropTypes.func.isRequired
};
