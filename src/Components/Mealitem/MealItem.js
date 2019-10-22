import React from 'react';
import PropTypes from 'prop-types';
import './MealItem.css';

export default function MealItem(props) {
  return (
    <div className="mealInfo">
      <p className="meal-name">{props.name}</p>
      <div className="meal-macros">
        <p className="protein">Protein: {props.macros.protein}</p>
        <p className="protein">Carbs: {props.macros.carbs}</p>
        <p className="protein">Fats: {props.macros.fats}</p>
      </div>
      <p>{new Date(props.dateAdded).toLocaleDateString()}</p>
    </div>
  );
}

MealItem.propTypes = {
  id: PropTypes.number,
  macros: PropTypes.shape({
    protein: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    carbs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fats: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  name: PropTypes.string
};

MealItem.defaultProps = {
  id: '1234',
  macros: {
    protein: '0',
    carbs: '0',
    fats: '0'
  },
  name: 'Meal Name'
};
