import React from 'react';
import STORE from '../../store';
import './FoodLog.css';
import FoodItem from '../FoodItem/FoodItem';

export default class FoodLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      servings: {
        value: '',
        touched: false
      }
    };
  }
  componentDidMount() {
    const userFood = STORE.foods;
    this.setState({ foods: [...userFood] });
  }

  render() {
    return (
      <>
        <section className="food-log-container">
          {this.state.foods.map((food, i) => {
            const { protein, carbs, fats } = food;
            const macros = { protein, carbs, fats };
            return (
              <div key={food.food_id} className="food-item-container">
                <FoodItem key={food.food_id} macros={macros} name={food.name} />
                <form action="add-food" className="add-food">
                  <label htmlFor="servings">Servings</label>
                  <input type="number" id="servings" min="1" />
                  <button type="submit">Add</button>
                </form>
              </div>
            );
          })}
        </section>
      </>
    );
  }
}
