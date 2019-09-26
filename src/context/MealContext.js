import React, { Component } from 'react';

export const nullMeal = {
  name: '',
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
    console.log(this.context.foods)
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
