import React, { Component } from 'react';

export const nullMeal = {
  name: '',
  meal_id: '',
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

export class MealsProvider extends Component {
  constructor(props) {
    this.state = {
      meal: nullMeal,
      error: null
    };
  }

  setFoods = foods => {
    this.setState({ foods });
  };

  addFood = food => {
    this.setFoods({
      ...this.state.foods,
      food
    });
  };

  deleteFood = foodId => {
    const updatedFoods = this.state.foods.filter(food => food.id !== foodId);
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
