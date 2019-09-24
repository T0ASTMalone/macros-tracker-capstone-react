import React from 'react';
import './FoodItem.css';

export default function FoodItem(props) {
  console.log(props);
  return (
    <div className="flog-item">
      <div className="food-info">
        <p>{props.name}</p>
        <div className="food-macros">
          <p>Protein: {props.macros.protein}</p>
          <p>Carbs: {props.macros.carbs}</p>
          <p>Fats: {props.macros.fats}</p>
        </div>
      </div>
      <form action="add-food" className="add-food">
        <label htmlFor="servings">Servings</label>
        <input type="number" id="servings" min="1" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
