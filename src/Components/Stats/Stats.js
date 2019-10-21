import React from 'react';
import PropTypes from 'prop-types';
import './Stats.css';

export default function Stats(props) {
  return (
    <div className="stats">
      <h2 className="stats-title">Todays Stats</h2>
      <p className="macros">
        Protein: {props.progress.protein} / {props.macros.protein} g
      </p>
      <p className="macros">
        Carbs: {props.progress.carbs}/ {props.macros.carbs} g
      </p>
      <p className="macros">
        Fat: {props.progress.fats} / {props.macros.fats} g
      </p>
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
