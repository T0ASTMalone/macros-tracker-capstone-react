import React from 'react';
import './AddMeal.css';
import FoodItem from '../../Components/FoodItem/FoodItem';
import MealsContext from '../../context/MealContext';

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static contextType = MealsContext;

  handleRedirect = () => {
    this.props.history.push('/user/:id/add-food');
  };

  handleDeleteItem = id => {
    this.context.deleteFood(id);
  };

  render() {
    return (
      <div className="add-meal">
        <div className="food-items">
          <header>
            <h1>Add Meal</h1>
          </header>
          <div className="foods" id="foods">
            {this.context.meal.foods === undefined ||
            this.context.meal.foods < 1 ? (
              <div className="food-item empty">
                <button className="add" onClick={this.handleRedirect}>
                  +
                </button>
              </div>
            ) : (
              this.context.meal.foods.map((food, i) => {
                const { protein, carbs, fats } = food;
                const macros = { protein, carbs, fats };
                return (
                  <div key={i} className="food-item new">
                    <FoodItem name={food.food_name} macros={macros} />
                    <button
                      className="delete"
                      onClick={() => this.handleDeleteItem(food.food_id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            )}
          </div>
          <div className="button-container">
            <button className="button-add-food" onClick={this.handleRedirect}>
              Add Food Item
            </button>
            <button className="button create-meal">Create Meal</button>
          </div>
        </div>

        <button className="add-existing">Add From Your Log</button>
      </div>
    );
  }
}
