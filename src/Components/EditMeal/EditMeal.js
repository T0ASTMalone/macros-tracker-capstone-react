import React, { Component } from 'react';
import FoodLog from '../FoodLog/FoodLog';
import MacrosService from '../../Services/macros-services';
import MacroFyServices from '../../Services/macrofy-api-service';

export default class EditMeal extends Component {
  state = {};

  componentDidMount() {
    let foods = this.props.meal.foods;
    let foodsObj = {};
    foods.forEach(food => (foodsObj[food.id] = food));
    this.setState({ foods: foodsObj });
  }

  updateFood = (id, servings) => {
    this.setState({
      foods: {
        ...this.state.foods,
        [id]: { ...this.state.foods[id], servings }
      }
    });
  };

  handleSubmit = async () => {
    let foods = this.state.foods;
    let originalFoods = this.props.meal.foods;
    let foodKeys = Object.keys(foods);
    let foodArr = [];
    let mealArr = [];
    foodKeys.forEach((key, i) => {
      if (foods[key] !== originalFoods[i]) foodArr.push(foods[key]);
      foods[key] = MacrosService.totalFoodMacros(foods[key]);
      mealArr.push(foods[key]);
    });
    let macros = MacrosService.totalMealMacros(mealArr);

    let id = foodArr[0].meal_id;
    await MacroFyServices.patchMeal(id, macros);
    foodArr.forEach(
      async food => await MacroFyServices.patchFood(food.id, food)
    );
  };

  render() {
    const { meal, hide } = this.props;
    return (
      <>
        <FoodLog
          foods={meal.foods}
          hide={hide}
          edit={true}
          updateServings={(id, ser) => this.updateFood(id, ser)}
        />
        <div className="update-btn-container">
          <button
            onClick={this.handleSubmit}
            className="button update-meal-button"
          >
            Update Meal
          </button>
        </div>
      </>
    );
  }
}
