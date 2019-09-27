import React, { Component } from 'react';

const MealListContext = React.createContext({
  mealList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setMealList: () => {}
});

export default MealListContext;

export class MealListProvider extends Component {
  state = {
    mealList: [],
    error: null
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setMealList = mealList => {
    this.setState({ mealList });
  };

  addMeal = newMeal => {
    this.state.mealList === undefined
      ? this.setMealList([newMeal])
      : this.setMealList([...this.state.mealList, newMeal]);
  };

  deleteMeal = mealId => {
    const updatedMealList = this.state.mealList.filter(meal => {
      return meal.meal_id !== mealId;
    });
    this.setMealList(updatedMealList);
  };

  render() {
    const value = {
      mealList: this.state.mealList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setMealList: this.setMealList,
      deleteMeal: this.deleteMeal,
      addMeal: this.addMeal
    };

    return (
      <MealListContext.Provider value={value}>
        {this.props.children}
      </MealListContext.Provider>
    );
  }
}
