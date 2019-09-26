import React from 'react';
import './AddMeal.css';
import { Link } from 'react-router-dom';
import FoodItem from '../../Components/FoodItem/FoodItem';
import MealsContext from '../../context/MealContext';

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      foods: []
    };
  }

  static contextType = MealsContext;
  
  componentDidMount() {
   console.log(this.context.foods);
  }


  render() {
    console.log(this.context.foods)
    return (
      <div className="add-meal">
        <div className="food-items">
          <header>
            <h1>Add Meal</h1>
          </header>
          <div className="foods" id="foods">
            {this.state.foods.length < 1 ? (
              <div className="food-item">
                <button className="add" onClick={this.handleAddFoodItem}>
                  +
                </button>
              </div>
            ) : (
              this.state.foods.map(food => {
                const { protein, carbs, fats } = food;
                const macros = { protein, carbs, fats };
                return <FoodItem name={food.name} macros={macros} />;
              })
            )}
          </div>
          <div className="button-container">
            <button className="button-add-food">
              <Link to="/user/:id/add-food">Add Food Item</Link>
            </button>
            <button className="button create-meal">Create Meal</button>
          </div>
        </div>

        <button className="add-existing">
          <Link to="/user/:id/meal-log">Add Existing</Link>
        </button>
      </div>
    );
  }
}
