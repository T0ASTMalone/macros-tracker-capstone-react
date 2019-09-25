import React from 'react';
import './AddMeal.css';
//import { Redirect } from 'react-router-dom';
import FoodItem from '../../Components/FoodItem/FoodItem';

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods : []
    }
  }

  handleAddExisting = () => {
    this.props.history.push('/user/:id/meal-log');
    //<Redirect to="/user/:id/meal-log" />
  };

  handleAddFoodItem = () => {
    this.props.history.push('/user/:id/add-food');
    // return <Redirect to="/user/:id/add-food" />;
  };

  addFoodItem = newFood => {
    const foods = this.state.foods;

    this.setState({
      foods: [...foods, newFood]
    })
  }

  deleteFood = id => {
    //create variable that is an array with everything but the food with the id provided
    // const updatedFoods = this.state.foods.find(food => food.id === id)
    const temp = [0, 1, 2];
    this.setState({ foods: [...temp]})
  }

  render() {
    return (
      <div className="add-meal">
        <div className="food-items">
          <header>
            <h1>Add Meal</h1>
          </header>
          <div className="foods" id="foods">
              {this.state.foods.length < 1 ?<div className="food-item"> <button className="add">+</button> </div>: this.state.foods.map(food => {
                const {protein, carbs, fats } = food;
                const macros = {protein, carbs, fats}
                return (
                  <FoodItem name={food.name} macros={macros}/>
                )
              })}
          </div>
          <div className="button-container">
            <button
              className="button add-food"
              onClick={this.handleAddFoodItem}
            >
              Add Food Item
            </button>
            <button className="button create-meal">Create Meal</button>
          </div>
        </div>

        <button className="add-existing" onClick={this.handleAddExisting}>
          Add Existing
        </button>
      </div>
    );
  }
}
