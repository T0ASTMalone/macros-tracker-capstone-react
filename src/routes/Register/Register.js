import React from 'react';
import './Register.css';

export default class Register extends React.Component {
  handleClick = e => {
    console.log(e);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push('/dashboard/:user');
  };
  render() {
    return (
      <>
        <form
          action="register-user"
          className="register-user"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input type="email" required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" required />
          <div className="user-info">
            <label htmlFor="age">Age</label>
            <input type="number" min="16" id="age" />
            <label htmlFor="gender">Gender</label>
            <select id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="button-container">
              <button
                type="button"
                className="button metric"
                value="metric"
                name="unit"
                onClick={e => this.handleClick(e.target.value)}
              >
                Metric
              </button>
              <button
                type="button"
                className="button imperial"
                value="imperial"
                name="unit"
                onClick={e => this.handleClick(e.target.value)}
              >
                Imperial
              </button>
            </div>

            <label htmlFor="height">Height</label>
            <input type="number" id="height" min="0" />
            <label htmlFor="weight">Weight</label>
            <input type="number" id="weight" min="0" />
            <div className="slidecontainer">
              <label htmlFor="level-of-activity">Level of activity</label>
              <input
                id="level-of-activity"
                type="range"
                min="1"
                max="100"
                className="slider"
              />
            </div>
            <label htmlFor="fitness-goals">Fitness Goals</label>
            <select name="fitness-goals" id="fitness-goals">
              <option value="maintain">Maintain weight</option>
              <option value="gain">Gain weight</option>
              <option value="lose">Lose weight</option>
            </select>
          </div>
          <button type="submit" className="button register">
            Register
          </button>
        </form>
      </>
    );
  }
}
