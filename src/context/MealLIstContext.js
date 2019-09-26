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
    console.log(mealList);
    this.setState({ mealList });
  };

  render() {
    const value = {
      mealList: this.state.mealList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setMealList: this.setMealList
    };

    return (
      <MealListContext.Provider value={value}>
        {this.props.children}
      </MealListContext.Provider>
    );
  }
}
