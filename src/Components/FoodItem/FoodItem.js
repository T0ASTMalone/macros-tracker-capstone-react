import React from 'react';
import PropTypes from 'prop-types';
import './FoodItem.css';

export default function FoodItem(props) {
  return (
    <div className="food-info">
      {props.image !== undefined ? (
        <img src={props.image} alt={props.name} />
      ) : (
        <></>
      )}
      <p>{props.name}</p>
      {props.macros !== undefined ? (
        <div className="food-macros">
          <p>Protein: {props.macros.protein}</p>
          <p>Carbs: {props.macros.carbs}</p>
          <p>Fats: {props.macros.fats}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

FoodItem.propTypes = {
  macros: PropTypes.shape({
    protein: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    carbs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fats: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  name: PropTypes.string
};
