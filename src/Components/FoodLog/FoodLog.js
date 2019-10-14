import React from 'react';
import PropTypes from 'prop-types';
//import STORE from '../../store';
import './FoodLog.css';
import FoodItem from '../FoodItem/FoodItem';
import AddFoodLogItem from '../AddFoodLogItem/AddFoodLogItem';
import MealListContext from '../../context/MealLIstContext';
import MacroFyServices from '../../Services/macrofy-api-service';
//move this component to AddFoodLogItem.js
//import AddFoodItemError from '../AddFoodItem/AddFoodItemError';

export default class FoodLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: []
    };
  }

  static contextType = MealListContext;

  async componentDidMount() {
    const id = this.context.userId;
    try {
      const userFoods = await MacroFyServices.getAllFoods(id);
      userFoods.map(food => {
        const { protein, carbs, fats } = food;
        const macros = { protein, fats, carbs };
        return Object.keys(macros).map(macro => {
          console.log(food.servings);
          return macros[macro]
            ? (food[macro] /= food.servings)
            : (food[macro] = 0);
        });
      });
      console.log(userFoods);
      this.setState({ foods: [...userFoods] });
    } catch (error) {
      console.log(error);
    }
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
            console.log(food.id);
            return (
              <div key={food.id} className="food-item-container">
                <FoodItem macros={macros} name={food.food_name} />
                <AddFoodLogItem food={food} hide={this.props.hide} />
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
};
