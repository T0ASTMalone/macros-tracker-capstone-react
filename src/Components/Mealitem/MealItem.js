import React from 'react';
import PropTypes from 'prop-types'
import './MealItem.css';

export default class MealItem extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="mealInfo">
        <p className="meal-name">{this.props.name}</p>
        <div className="meal-macros">
          <p className="protein">Protein: {this.props.macros.protein}</p>
          <p className="protein">Carbs: {this.props.macros.carbs}</p>
          <p className="protein">Fats: {this.props.macros.fats}</p>
        </div>
        <p>{new Date().toLocaleTimeString()}</p>
      </div>
    );
  }
}

MealItem.propTypes = {
  id: PropTypes.number,
  macros: PropTypes.shape({
    protein: PropTypes.string,
    carbs: PropTypes.string,
    fats: PropTypes.string
  }),
  name: PropTypes.string
}
