//move into component folder

import React from 'react';
import './AddMeal.css';
import PropTypes from 'prop-types'
import FoodItem from '../FoodItem/FoodItem';
import MealsContext from '../../context/MealContext';
import MealListContext from '../../context/MealLIstContext';
import MacrosService from '../../Services/macros-services';
import uuid from 'uuid';
import AddMealError from './AddMealError';
import STORE from '../../store';

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      mealId: '',
      mealName: {
        value: '',
        touched: false
      }
    };
  }

  static contextType = MealsContext;

  componentDidMount() {
    if (this.context.mealName) {
      this.setState({ mealName: this.context.mealName });
    }
  }

  handleAddFood = () => {
    this.props.show.showAddFood();
    this.setState({ error: null });
  };

  handleDeleteFoodItem = id => {
    this.context.deleteFood(id);
  };

  handleAddExisting = () => {
    this.props.show.showMealLog();
    this.setState({ error: null });
  };

  calculateTotalMacros() {
    return MacrosService.totalMealMacros(this.context.meal.foods);
  }

  updateName = name => {
    this.setState({ mealName: { value: name, touched: true } });
  };

  validateName = () => {
    const name = this.state.mealName.value.trim();
    if (name.length < 1) {
      return 'A meal name is required';
    }
    if (name.length > 50) {
      return 'The meal name must be under 50 characters';
    }
  };

  render() {
    console.log(this.props);
    return (
      <MealListContext.Consumer>
        {ListContext => {
          const { protein, carbs, fats } = this.calculateTotalMacros();
          const meal = {
            meal_name: this.state.mealName.value,
            ...this.context.meal,
            protein,
            carbs,
            fats
          };

          const handleAddMeal = e => {
            e.preventDefault();
            const mealName = this.state.mealName.value;
            if (meal.foods.length < 1 && mealName.length < 1) {
              this.setState({
                error: 'There needs to be at least one food item',
                mealName: { value: '', touched: true }
              });
            } else if (mealName.length < 1) {
              this.setState({
                mealName: { value: '', touched: true }
              });
            } else if (meal.foods.length < 1) {
              this.setState({
                error: 'There needs to be at least one food item'
              });
            } else {
              meal.meal_id = uuid();
              ListContext.addMeal(meal);
              const { meal_id, meal_name, protein, carbs, fats } = meal;
              const mealLogMeal = { meal_id, meal_name, protein, carbs, fats };
              const newMealList = [...STORE.mealLog, mealLogMeal];
              STORE.mealLog = newMealList;
              let foods = meal.foods;
              foods.forEach(food => {
                food.food_id = uuid();
                food.meal_id = meal.meal_id;
              });
              const newFoodList = [...STORE.foods, ...foods];
              STORE.foods = newFoodList;
              this.context.clearFoods();
              this.setState({ mealName: { value: '', touched: false } });
            }
          };

          return (
            <div className="add-meal">
              <div className="food-items">
                <header>
                  <h1>Create Meal</h1>
                </header>
                <form
                  action="create-meal"
                  className="add-meal"
                  onSubmit={e => handleAddMeal(e)}
                >
                  <label htmlFor="meal-name" className="meal-name">
                    Meal Name
                  </label>
                  <input
                    type="text"
                    id="meal-name"
                    className="meal-name"
                    value={this.state.mealName.value}
                    onChange={e => this.updateName(e.target.value)}
                    placeholder="Chicken and waffles"
                  />
                  <AddMealError
                    hasError={this.validateName()}
                    touched={this.state.mealName.touched}
                  />
                  <div className="foods" id="foods">
                    {this.context.meal.foods === undefined ||
                    this.context.meal.foods < 1 ? (
                      <div className="food-item empty">
                        <button
                          type="button"
                          className="add"
                          onClick={this.handleAddFood}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      this.context.meal.foods.map((food, i) => {
                        const { protein, carbs, fats } = food;
                        const macros = { protein, carbs, fats };
                        return (
                          <div key={i} className="food-item new">
                            <FoodItem name={food.food_name} macros={macros} />
                            <button
                              type="button"
                              className="delete"
                              onClick={() =>
                                this.handleDeleteFoodItem(food.food_id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {this.state.error !== null ? (
                    <div className="error">{this.state.error}</div>
                  ) : (
                    <></>
                  )}
                  <div className="button-container">
                    <button
                      className="button add-food-item"
                      onClick={this.handleAddFood}
                      type="button"
                    >
                      Add Food
                    </button>
                    <button
                      type="button"
                      className="button add-existing"
                      onClick={this.handleAddExisting}
                    >
                      Add from Meal Log
                    </button>
                  </div>
                  <button className="button create-meal" type="submit">
                    Create Meal
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </MealListContext.Consumer>
    );
  }
}

AddMeal.propTypes = {
  show: PropTypes.shape({
    showAddFood: PropTypes.func.isRequired,
    showMealLog: PropTypes.func.isRequired
  })
}