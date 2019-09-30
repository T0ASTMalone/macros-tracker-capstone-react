import React from 'react';
import './AddMeal.css';
import FoodItem from '../../Components/FoodItem/FoodItem';
import MealsContext from '../../context/MealContext';
import MealListContext from '../../context/MealLIstContext';
import MacrosService from '../../Services/macros-services';
import uuid from 'uuid';

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

  componentDidMount() {
    this.setState({ mealId: uuid() });
  }

  static contextType = MealsContext;

  handleAddFood = () => {
    this.props.history.push('/user/:id/add-food');
  };

  handleDeleteFoodItem = id => {
    this.context.deleteFood(id);
  };

  handleAddExisting = () => {
    this.props.history.push('/user/:id/meal-log');
  };

  calculateTotalMacros() {
    return MacrosService.totalMealMacros(this.context.meal.foods);
  }

  updateName = name => {
    this.setState({ mealName: { value: name, touched: true } });
  };

  render() {
    return (
      <MealListContext.Consumer>
        {ListContext => {
          const { protein, carbs, fats } = this.calculateTotalMacros();
          const meal = {
            meal_id: this.state.mealId,
            meal_name: this.state.mealName,
            ...this.context.meal,
            protein,
            carbs,
            fats
          };

          const handleAddMeal = () => {
            if (meal.foods.length >= 1) {
              ListContext.addMeal(meal);
              this.props.history.push('/user/:id/dashboard');
              this.context.clearFoods();
            } else if (meal.foods.length < 1)
              this.setState({
                error: 'There needs to be at least one food item'
              });
          };

          return (
            <div className="add-meal">
              <div className="food-items">
                <header>
                  <h1>Add Meal</h1>
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
                {this.state.error !== null ? (
                  <div className="error">{this.state.error}</div>
                ) : (
                  <></>
                )}

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
