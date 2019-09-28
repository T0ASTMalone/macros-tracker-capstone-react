import React from 'react';
import './Overview.css';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    const { radius, stroke } = this.props;
    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

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
    const { radius, stroke, progress } = this.props;
    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;
    return (
      <div className="overview-macro">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="white"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={this.circumference + ' ' + this.circumference}
            style={{ strokeDashoffset }}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <p>{progress}%</p>
      </div>
    );
  }
}
