import React from "react";
import "./Overview.css";
import PropTypes from "prop-types";

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    const { radius, stroke } = this.props;
    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  static defaultProps = {
    progress: 0,
    name: "",
    stroke: 8,
    radius: 60
  };

  /*circleProgress() {
    var circle = document.querySelector('circle');
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    const input = document.querySelector('input');
    setProgress(input.value);

    input.addEventListener('change', function(e) {
      if (input.value < 101 && input.value > -1) {
        setProgress(input.value);
      }
    });
  }*/

  render() {
    const { radius, stroke, progress, name } = this.props;

    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;

    return (
      <div className='overview-macro'>
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke='white'
            fill='transparent'
            strokeWidth={stroke}
            strokeDasharray={this.circumference + " " + this.circumference}
            style={{ strokeDashoffset }}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text
            alignmentBaseline='middle'
            x='50%'
            y='50%'
            textAnchor='middle'
            stroke='white'
            strokeWidth='1px'
            className='progress-macro'
            fill='white'
          >
            {name}
          </text>
        </svg>
        <p>{progress}%</p>
      </div>
    );
  }
}

Overview.propTypes = {
  class: PropTypes.string,
  name: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  stroke: PropTypes.number.isRequired
};
