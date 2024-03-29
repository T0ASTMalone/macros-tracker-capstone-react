import React from 'react';
import './AddMeal.css';
import PropTypes from 'prop-types';
import FoodItem from '../FoodItem/FoodItem';
import MealsContext from '../../context/MealContext';
import MealListContext from '../../context/MealLIstContext';
import MacrosService from '../../Services/macros-services';
import AddMealError from './AddMealError';
import MacroFyServices from '../../Services/macrofy-api-service';

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
    this.props.show.showPopUp('Add');
    this.setState({ error: null });
  };

  handleDeleteFoodItem = key => {
    this.context.deleteFood(key);
  };

  handleAddExisting = () => {
    this.props.show.showPopUp('MealLog');
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

  async postMeal(meal, foods) {
    try {
      const response = await MacroFyServices.postMeal(meal);
      foods.forEach(food => {
        delete food.date_added;
        delete food.id;
        delete food.foodKey;
        food.user_id = response.user_id;
        food.meal_id = response.meal_id;
      });
      await MacroFyServices.postFoods(foods);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <MealListContext.Consumer>
        {ListContext => {
          const { protein, carbs, fats } = this.calculateTotalMacros();
          const user_id = ListContext.userId;
          const meal = {
            user_id,
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
              ListContext.addMeal(meal);
              const {
                user_id,
                meal_id,
                meal_name,
                protein,
                carbs,
                fats
              } = meal;
              const mealLogMeal = {
                user_id,
                meal_id,
                meal_name,
                protein,
                carbs,
                fats
              };
              let foods = meal.foods;
              this.postMeal(mealLogMeal, foods);
              this.context.clearFoods();
              this.setState({ mealName: { value: '', touched: false } });
            }
          };

          return (
            <div className="add-meal">
              <div className="food-items">
                <header>
                  <h1 className="section-title">Create Meal</h1>
                </header>
                <form
                  action="create-meal"
                  className="add-meal"
                  onSubmit={e => handleAddMeal(e)}
                >
                  <label htmlFor="meal-name">Meal Name</label>
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
                          className=""
                          onClick={this.handleAddFood}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      this.context.meal.foods.map((food, i) => {
                        const { protein, carbs, fats } = food;
                        const macros = { protein, carbs, fats };
                        console.log(this.context.meal.foods);
                        return (
                          <div key={i} className="food-item new">
                            <FoodItem name={food.food_name} macros={macros} />
                            <button
                              type="button"
                              className="delete button"
                              onClick={() =>
                                this.handleDeleteFoodItem(food.foodKey)
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
                      className="button add-item"
                      onClick={this.handleAddFood}
                      type="button"
                    >
                      Add Food
                    </button>
                    <button
                      type="button"
                      className="button add-item"
                      onClick={this.handleAddExisting}
                    >
                      Meal Log
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
    showPopUp: PropTypes.func.isRequired
  })
};
