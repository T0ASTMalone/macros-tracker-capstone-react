import React, { Component } from 'react';

const MealListContext = React.createContext({
  mealList: [],
  totalMacros: {},
  userId: null,
  userMacros: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setMealList: () => {}
});

export default MealListContext;

export class MealListProvider extends Component {
  state = {
    mealList: [],
    totalMacros: {},
    userMacros: {},
    error: null,
    userId: null
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  clearMeals = () => {
    this.setState({ mealList: [] });
  };

  setMealList = mealList => {
    this.setState({ mealList });
  };

  setMacros = macros => {};

  setUserInfo = (macros, id) => {
    this.setState({ userMacros: macros, userId: id });
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
      totalMacros: this.state.totalMacros,
      mealList: this.state.mealList,
      userMacros: this.state.userMacros,
      userId: this.state.userId,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setMealList: this.setMealList,
      deleteMeal: this.deleteMeal,
      addMeal: this.addMeal,
      setMacros: this.setMacros,
      setUserInfo: this.setUserInfo,
      clearMeals: this.clearMeals
    };

    return (
      <MealListContext.Provider value={value}>
        {this.props.children}
      </MealListContext.Provider>
    );
  }
}
