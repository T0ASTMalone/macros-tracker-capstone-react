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
    const foodList = this.context.foods;
    if (foodList !== undefined) {
      this.setState({ foods: [...this.context.foods] });
    }
  }

  handleDeleteItem = id => {
    console.log(id);
    this.context.deleteFood(id);
    this.forceUpdate();
  };

  render() {
    return (
      <div className="add-meal">
        <div className="food-items">
          <header>
            <h1>Add Meal</h1>
          </header>
          <div className="foods" id="foods">
            {this.context.foods === undefined || this.context.foods < 1 ? (
              <div className="food-item empty">
                <button className="add">+</button>
              </div>
            ) : (
              this.context.foods.map((food, i) => {
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
