import React from 'react';
import STORE from '../../store';
import './FoodLog.css';
import FoodItem from '../FoodItem/FoodItem';

export default class FoodLog extends React.Component {
  componentDidMount() {
    //fetch food logs from the past two days or so
  }

  render() {
    return (
      <>
        <section className="food-log-container">
          {STORE.foods.map((food, i) => {
            const { protein, carbs, fats } = food;
            const macros = { protein, carbs, fats };
            return <FoodItem key={i} macros={macros} name={food.name} />;
          })}
        </section>
      </>
    );
  }
}
