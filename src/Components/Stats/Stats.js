import React from 'react';
import './Stats.css';

export default class Stats extends React.Component {
  static defaultProps = {
    progress: {
      protein: 0,
      carbs: 0,
      fats: 0
    }
  };

  render() {
    return (
      <div className="stats">
        <h2 className="stats-title">Todays Stats</h2>
        <p className="macros">
          Protein: {this.props.progress.protein} / {this.props.macros.protein} g
        </p>
        <p className="macros">
          Carbs: {this.props.progress.carbs}/ {this.props.macros.carbs} g
        </p>
        <p className="macros">
          Fat: {this.props.progress.fats} / {this.props.macros.fats} g
        </p>
      </div>
    );
  }
}
