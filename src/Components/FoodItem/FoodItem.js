import React from 'react';
import PropTypes from 'prop-types';
import './FoodItem.css';

export default function FoodItem(props) {
  return (
    <div className="food-info">
      <div className="food-name-container">
        <p
          className={
            props.name.length > 23
              ? 'food-log-item-name scroll'
              : 'food-log-item-name'
          }
        >
          {props.name}
        </p>
      </div>
      {props.macros !== undefined ? (
        <div className="food-macros">
          <p className="macro">P: {Math.floor(props.macros.protein)}</p>
          <p className="macro">C: {Math.floor(props.macros.carbs)}</p>
          <p className="macro">F: {Math.floor(props.macros.fats)}</p>
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
