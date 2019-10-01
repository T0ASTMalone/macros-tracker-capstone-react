import React, { Component } from 'react';

export const nullMeal = {
  meal_name: '',
  foods: [],
  macros: []
};

const MealsContext = React.createContext({
  mealName: '',
  meal: nullMeal,
  foods: [],
  addFood: () => {},
  deleteFood: () => {},
  setFoods: () => {}
});

export default MealsContext;

export class MealProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealName: '',
      meal: nullMeal,
      error: null
    };
  }

  setMealName = name => {
    console.log(name);
    this.setState({ mealName: name });
  };

  setFoods = foods => {
    this.setState({ meal: { foods } });
  };

  clearFoods = () => {
    this.setState({ meal: nullMeal });
  };

  addFood = food => {
    this.state.meal.foods === undefined
      ? this.setFoods([food])
      : this.setFoods([...this.state.meal.foods, food]);
  };

  deleteFood = foodId => {
    const updatedFoods = this.state.meal.foods.filter(food => {
      return food.food_id !== foodId;
    });
    this.setFoods([...updatedFoods]);
  };

  render() {
    const value = {
      mealName: this.state.name,
      meal: this.state.meal,
      foods: this.state.foods,
      error: this.state.error,
      setFoods: this.setFoods,
      setMealName: this.setMealName,
      addFood: this.addFood,
      deleteFood: this.deleteFood,
      clearFoods: this.clearFoods
    };

    return (
      <MealsContext.Provider value={value}>
        {this.props.children}
      </MealsContext.Provider>
    );
  }
}
