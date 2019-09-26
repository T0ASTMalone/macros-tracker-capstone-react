import React from 'react';
import './FoodItem.css';

export default function FoodItem(props) {
  return (
    <div className="food-info">
      <p>{props.name}</p>
      <div className="food-macros">
        <p>Protein: {props.macros.protein}</p>
        <p>Carbs: {props.macros.carbs}</p>
        <p>Fats: {props.macros.fats}</p>
      </div>
    </div>
  );
}
