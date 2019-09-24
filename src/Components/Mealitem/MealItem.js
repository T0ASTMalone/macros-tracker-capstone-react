import React from 'react';
import './MealItem.css';

export default class MealItem extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date().toLocaleTimeString();
    const name = this.props.name || 'Meal name';
    this.state = {
      date,
      name
    };
  }
  render() {
    return (
      <div className="meal-item" key={this.props.id}>
        <div className="mealInfo">
          <p className="meal-name">{this.state.name}</p>
          <div className="meal-macros">
            <p className="protein">Protein: {this.props.macros.protein}</p>
            <p className="protein">Carbs: {this.props.macros.carbs}</p>
            <p className="protein">Fats: {this.props.macros.fats}</p>
          </div>
          <p>{this.state.date}</p>
        </div>
        <button className="button delete">Delete</button>
      </div>
    );
  }
}
