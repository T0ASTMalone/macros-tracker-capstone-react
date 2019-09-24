import React from 'react';
import './Stats.css';

export default class Stats extends React.Component {
  render() {
    return (
      <div className="stats">
        <h2 className="header">Todays Stats</h2>
        <p className="macros">Protein: 100 / 200 g</p>
        <p className="macros">Carbs: 200/ 5000 g</p>
        <p className="macros">Fat: 2000 / 60 g</p>
      </div>
    );
  }
}
