import React from 'react';
import PropTypes from 'prop-types';
import './Stats.css';

export default function Stats(props) {
  return (
    <div className="stats">
      <h2 className="section-title stats-title">Your Goals</h2>
      <div className="stats-container">
        <div className="macro-goal">
          <p className="macros">
            Protein: {props.progress.protein} / {props.macros.protein} g
          </p>
        </div>
        <div className="macro-goal">
          <p className="macros">
            Carbs: {props.progress.carbs}/ {props.macros.carbs} g
          </p>
        </div>
        <div className="macro-goal">
          <p className="macros">
            Fat: {props.progress.fats} / {props.macros.fats} g
          </p>
        </div>
      </div>
    </div>
  );
}

Stats.defaultProps = {
  macros: {
    protein: '0',
    carbs: '0',
    fats: '0'
  },
  progress: {
    protein: 0,
    carbs: 0,
    fats: 0
  }
};

Stats.propTypes = {
  macros: PropTypes.shape({
    id: PropTypes.string,
    protein: PropTypes.string,
    carbs: PropTypes.string,
    fats: PropTypes.string
  }),
  progress: PropTypes.shape({
    protein: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fats: PropTypes.number.isRequired
  })
};
