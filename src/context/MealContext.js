import React, { Component } from 'react';

export const nullMeal = {
  meal_name: '',
  foods: [],
  macros: []
};

const MealsContext = React.createContext({
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
      meal: nullMeal,
      error: null
    };
  }

  setFoods = foods => {
    this.setState({ meal: { meal_name: 'temp', foods, macros: [] } });
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
      meal: this.state.meal,
      foods: this.state.foods,
      error: this.state.error,
      setFoods: this.setFoods,
      addFood: this.addFood,
      deleteFood: this.deleteFood
    };

    return (
      <MealsContext.Provider value={value}>
        {this.props.children}
      </MealsContext.Provider>
    );
  }
}
