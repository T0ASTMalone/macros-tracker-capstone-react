//move into component folder

import React from 'react';
import './AddMeal.css';
import FoodItem from '../../Components/FoodItem/FoodItem';
import MealsContext from '../../context/MealContext';
import MealListContext from '../../context/MealLIstContext';
import MacrosService from '../../Services/macros-services';
import './AddMealError.js';
import uuid from 'uuid';
import AddMealError from './AddMealError.js';

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
    this.setState({ mealId: uuid() });
  }

  handleAddFood = () => {
    this.context.setMealName(this.state.mealName.value);
    this.props.show.showAddFood();
    //this.props.history.push('/user/:id/add-food');
  };

  handleDeleteFoodItem = id => {
    this.context.deleteFood(id);
  };

  handleAddExisting = () => {
    this.props.show.showMealLog();
    //this.props.history.push('/user/:id/meal-log');
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
    return (
      <MealListContext.Consumer>
        {ListContext => {
          const { protein, carbs, fats } = this.calculateTotalMacros();
          const meal = {
            meal_id: this.state.mealId,
            meal_name: this.state.mealName.value,
            ...this.context.meal,
            protein,
            carbs,
            fats
          };

          const handleAddMeal = () => {
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
              ListContext.addMeal(meal);
              //this.props.history.push('/user/:id/dashboard');
              this.context.clearFoods();
            }
          };

          return (
            <div className="add-meal">
              <div className="food-items">
                <header>
                  <h1>Create Meal</h1>
                </header>
                <label htmlFor="meal-name" className="meal-name">
                  Meal Name
                </label>
                <input
                  type="text"
                  id="meal-name"
                  className="meal-name"
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
                      <button className="add" onClick={this.handleAddFood}>
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
                    className="button-add-food"
                    onClick={this.handleAddFood}
                  >
                    Add Food Item
                  </button>
                  <button
                    className="button create-meal"
                    onClick={handleAddMeal}
                  >
                    Create Meal
                  </button>
                </div>
              </div>

              <button className="add-existing" onClick={this.handleAddExisting}>
                Add From Your Log
              </button>
            </div>
          );
        }}
      </MealListContext.Consumer>
    );
  }
}
