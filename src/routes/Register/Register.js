import React from 'react';
import './Register.css';
import RegisterError from './RegisterError';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: '', touched: false },
      password: { value: '', touched: false },
      confirmPassword: { value: '', touched: false },
      age: { value: '', touched: false },
      gender: { value: '', touched: false },
      height: { value: '', touched: false },
      weight: { value: '', touched: false },
      goals: { value: '', touched: false },
      activityLvl: { value: '', touched: false },
      unit: { value: '', touched: false }
    };
  }

  handleClick = e => {
    console.log(e);
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    //this.props.history.push('/dashboard/:user');
  };

  updateEmail = email => {
    this.setState({ email: { value: email, touched: true } });
  };
  updatePassword = password => {
    this.setState({ password: { value: password, touched: true } });
  };
  updateConfirmPassword = confirmPassword => {
    this.setState({
      confirmPassword: { value: confirmPassword, touched: true }
    });
  };
  updateAge = age => {
    this.setState({ age: { value: age, touched: true } });
  };
  updateGender = gender => {
    this.setState({ gender: { value: gender, touched: true } });
  };
  updateHeight = height => {
    this.setState({ height: { value: height, touched: true } });
  };
  updateWeight = weight => {
    this.setState({ weight: { value: weight, touched: true } });
  };
  updateGoals = goals => {
    this.setState({ goals: { value: goals, touched: true } });
  };
  updateActivityLvl = activityLvl => {
    this.setState({ activityLvl: { value: activityLvl, touched: true } });
  };
  updateUnit = unit => {
    this.setState({ unit: { value: unit, touched: true } });
  };

  validateEmail() {
    const email = this.state.email.value;
    if (email < 1) {
      return 'An email is required';
    }
  }

  validatePassword() {
    const password = this.state.password.value;
    if (password < 1) {
      return 'An password is required';
    }
  }
  validateConfirmPassword() {
    const confirmPassword = this.state.confirmPassword.value;
    if (confirmPassword < 1) {
      return 'You must confirm the password';
    }
  }
  validateGoal() {
    const goal = this.state.goals.value;
    if (goal < 1) {
      return 'An goal is required';
    }
  }
  validateHeight() {
    const height = this.state.height.value;
    if (height < 1) {
      return 'An height is required';
    }
  }
  validateWeight() {
    const weight = this.state.weight.value;
    if (weight < 1) {
      return 'An weight is required';
    }
  }
  validateGender() {
    const gender = this.state.gender.value;
    if (gender < 1) {
      return 'An gender is required';
    }
  }
  validateActivityLvl() {
    const activityLvl = this.state.activityLvl.value;
    if (activityLvl < 1) {
      return 'An activity level is required';
    }
  }
  validateAge() {
    const age = this.state.age.value;
    if (age < 1) {
      return 'An age is required';
    }
  }

  render() {
    return (
      <>
        <form
          action="register-user"
          className="register-user"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            onChange={e => this.updateEmail(e.target.value)}
          />
          <RegisterError hasError={this.validateEmail()} />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            onChange={e => this.updatePassword(e.target.value)}
          />
          <RegisterError hasError={this.validatePassword()} />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            required
            onChange={e => this.updateConfirmPassword(e.target.value)}
          />
          <RegisterError hasError={this.validateConfirmPassword()} />
          <div className="user-info">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              min="16"
              id="age"
              onChange={e => this.updateAge(e.target.value)}
            />
            <RegisterError hasError={this.validateAge()} />
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              onChange={e => this.updateGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <RegisterError hasError={this.validateGender()} />
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
            <input
              type="number"
              id="height"
              min="0"
              onChange={e => this.updateHeight(e.target.value)}
            />
            <RegisterError hasError={this.validateHeight()} />
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              min="0"
              onChange={e => this.updateWeight(e.target.value)}
            />
            <RegisterError hasError={this.validateWeight()} />
            <div className="slidecontainer">
              <label htmlFor="level-of-activity">Level of activity</label>
              <input
                id="level-of-activity"
                type="range"
                min="1"
                max="100"
                className="slider"
                onChange={e => this.updateActivityLvl(e.target.value)}
              />
              <RegisterError hasError={this.validateActivityLvl()} />
            </div>
            <label htmlFor="fitness-goals">Fitness Goals</label>
            <select
              name="fitness-goals"
              id="fitness-goals"
              onChange={e => this.updateGoals(e.target.value)}
            >
              <option value="maintain">Maintain weight</option>
              <option value="gain">Gain weight</option>
              <option value="lose">Lose weight</option>
            </select>
            <RegisterError hasError={this.validateGoal()} />
          </div>
          <button type="submit" className="button register">
            Register
          </button>
        </form>
      </>
    );
  }
}
