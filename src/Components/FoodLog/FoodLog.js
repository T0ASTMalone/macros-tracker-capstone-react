import React from 'react';
import PropTypes from 'prop-types'
import STORE from '../../store';
import './FoodLog.css';
import FoodItem from '../FoodItem/FoodItem';
import AddFoodLogItem from '../AddFoodLogItem/AddFoodLogItem';
//move this component to AddFoodLogItem.js
//import AddFoodItemError from '../AddFoodItem/AddFoodItemError';

export default class FoodLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: []
    };
  }

  componentDidMount() {
    const userFood = STORE.foods;
    this.setState({ foods: [...userFood] });
  }

  closeWindow = () => {
    this.props.hide('showFoodLog');
  };

  render() {
    return (
      <div className="container">
        <button className="close-window" onClick={this.closeWindow}>
          X
        </button>
        <section className="food-log-container">
          {this.state.foods.map((food, i) => {
            const { protein, carbs, fats } = food;
            const macros = { protein, carbs, fats };
            return (
              <div key={food.food_id} className="food-item-container">
                <FoodItem
                  key={food.food_id}
                  macros={macros}
                  name={food.food_name}
                />
                <AddFoodLogItem
                  key={food.fod_id}
                  food={food}
                  hide={this.props.hide}
                />
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

FoodLog.propTypes = {
  hide: PropTypes.func.isRequired
}