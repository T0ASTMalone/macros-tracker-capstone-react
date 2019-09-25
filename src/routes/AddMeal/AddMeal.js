import React from 'react';
import './AddMeal.css';
//import { Redirect } from 'react-router-dom';

export default class AddMeal extends React.Component {
  handleAddExisting = () => {
    this.props.history.push('/user/:id/meal-log');
    //<Redirect to="/user/:id/meal-log" />
  };

  handleAddFoodItem = () => {
    this.props.history.push('/user/:id/add-food');
    // return <Redirect to="/user/:id/add-food" />;
  };

  render() {
    return (
      <div className="add-meal">
        <div className="food-items">
          <header>
            <h1>Add Meal</h1>
          </header>
          <div className="foods" id="foods">
            <div className="food-item">
              <button className="add">+</button>
            </div>
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
