import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MealLog.css';
//import STORE from '../../store';
import MealItem from '../Mealitem/MealItem';
import MealsContext from '../../context/MealContext';
import MacroFyServices from '../../Services/macrofy-api-service';

export default class MealLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealLog: []
    };
  }

  static contextType = MealsContext;

  async componentDidMount() {
    const id = this.context.userId;
    const meals = await MacroFyServices.getAllMeals(id);
    this.setState({ mealLog: [...meals] });
  }

  async handleAddMeal(meal) {
    const { meal_id } = meal;
    const mealFoods = await MacroFyServices.getMealFoods(meal_id);
    this.context.addFood(mealFoods);
    this.props.hide('showMealLog');
  }

  closeWindow = () => {
    this.props.hide('showMealLog');
  };

  render() {
    return (
      <div className="container">
        <button className="close-window" onClick={this.closeWindow}>
          X
        </button>
        <section id="meal-log-container">
          {this.state.mealLog.length > 0 ? (
            this.state.mealLog.map((meal, i) => {
              console.log(meal);
              const { protein, carbs, fats, meal_name } = meal;
              const macros = { protein, carbs, fats };
              return (
                <div key={i} className="meal-log-item">
                  <MealItem key={i} id={i} macros={macros} name={meal_name} />
                  <button
                    className="add-meal-log-item"
                    onClick={() => this.handleAddMeal(meal)}
                  >
                    Add
                  </button>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </section>
      </div>
    );
  }
}

MealLog.propTypes = {
  hide: PropTypes.func.isRequired
};
