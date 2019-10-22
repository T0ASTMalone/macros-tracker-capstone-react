import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Register.css";
import RegisterError from "./RegisterError";
import convert from "convert-units";
import AuthApiService from "../../Services/auth-api-services";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: { value: "", touched: false },
      password: { value: "", touched: false },
      confirmPassword: { value: "", touched: false },
      age: { value: "", touched: false },
      gender: { value: "male", touched: false },
      feet: { value: "", touched: false },
      cm: { value: "", touched: false },
      inches: { value: "", touched: true },
      weight: { value: "", touched: false },
      goals: { value: "", touched: false },
      activityLvl: { value: "1.55", touched: false },
      unit: { value: "imperial", touched: false }
    };
  }

  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleUnitSelect = e => {
    this.setState({ unit: { value: e, touched: true } });
  };

  convertHeight = () => {
    const unit = this.state.unit.value;
    let height;
    if (unit === "imperial") {
      let feet = Math.floor(
        convert(parseInt(this.state.feet.value))
          .from("ft")
          .to("cm")
      );
      let inches = Math.floor(
        convert(parseInt(this.state.inches.value))
          .from("in")
          .to("cm")
      );
      height = feet + inches;
    } else {
      height = this.state.cm.value;
    }

    return height;
  };

  convertWeight = () => {
    const unit = this.state.unit.value;
    let weight;
    if (unit === "imperial") {
      weight = convert(parseInt(this.state.weight.value))
        .from("lb")
        .to("kg");
    } else weight = this.state.weight.value;
    return weight;
  };

  clearValues = () => {
    this.setState({
      error: null,
      email: { value: "", touched: false },
      password: { value: "", touched: false },
      confirmPassword: { value: "", touched: false },
      age: { value: "", touched: false },
      gender: { value: "male", touched: false },
      feet: { value: "", touched: false },
      cm: { value: "", touched: false },
      inches: { value: "", touched: true },
      weight: { value: "", touched: false },
      goals: { value: "", touched: false },
      activityLvl: { value: "", touched: false },
      unit: { value: "imperial", touched: false }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const info = this.state;
    const user = {
      email: info.email.value,
      password: info.password.value,
      age: info.age.value,
      gender: info.gender.value,
      height: this.convertHeight(),
      weight: this.convertWeight(),
      goals: info.goals.value,
      activity_lvl: info.activityLvl.value
    };
    AuthApiService.postUser(user)
      .then(res => {
        this.clearValues();
        this.handleRegistrationSuccess();
      })
      .catch(err => {
        this.setState({ error: err.error });
      });
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/sign-in");
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
  updateFeet = feet => {
    this.setState({ feet: { value: feet, touched: true } });
  };
  updateInches = inches => {
    this.setState({ inches: { value: inches, touched: true } });
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
  updateCm = cm => {
    this.setState({ cm: { value: cm, touched: true } });
  };

  validateEmail() {
    const email = this.state.email.value;
    if (email < 1) {
      return "An email is required";
    }
  }

  validatePassword() {
    const password = this.state.password.value;
    if (password < 1) {
      return "A password is required";
    }
  }
  validateConfirmPassword() {
    const confirmPassword = this.state.confirmPassword.value;
    const password = this.state.password.value;
    if (confirmPassword < 1) {
      return "You must confirm the password";
    }
    if (confirmPassword !== password) {
      return "Password does not match";
    }
  }
  validateGoal() {
    const goal = this.state.goals.value;
    if (goal < 1) {
      return "A goal is required";
    }
  }
  validateHeight() {
    const height = this.state.feet.value || this.state.cm.value;
    if (height < 1) {
      return "A height is required";
    }
  }
  validateWeight() {
    const weight = this.state.weight.value;
    if (weight < 1) {
      return "A weight is required";
    }
  }
  validateGender() {
    const gender = this.state.gender.value;
    if (gender < 1) {
      return "A gender is required";
    }
  }
  validateActivityLvl() {
    const activityLvl = this.state.activityLvl.value;
    if (activityLvl < 1) {
      return "An activity level is required";
    }
  }
  validateAge() {
    const age = this.state.age.value;
    if (age < 1) {
      return "An age is required";
    }
  }

  render() {
    const unit = this.state.unit.value;
    return (
      <>
        <form
          action='register-user'
          className='register-user'
          onSubmit={this.handleSubmit}
        >
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            className='login'
            type='email'
            required
            placeHolder='email'
            onChange={e => this.updateEmail(e.target.value)}
          />
          <div className='login-error'>
            <RegisterError hasError={this.validateEmail()} />
          </div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className='login'
            required
            placeHolder='password'
            onChange={e => this.updatePassword(e.target.value)}
          />
          <div className='login-error'>
            <RegisterError hasError={this.validatePassword()} />
          </div>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            id='confirm-password'
            className='login'
            required
            placeHolder='confirm-password'
            onChange={e => this.updateConfirmPassword(e.target.value)}
          />
          <div className='login-error'>
            <RegisterError hasError={this.validateConfirmPassword()} />
          </div>
          <div className='user-info'>
            <div className='age-gen'>
              <div className='inputs'>
                <div>
                  <label htmlFor='age'>Age</label>
                  <br />
                  <input
                    type='number'
                    min='16'
                    id='age'
                    className='info'
                    placeHolder='yrs'
                    onChange={e => this.updateAge(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor='gender'>Gender</label>
                  <br />
                  <select
                    id='gender'
                    className='info'
                    onChange={e => this.updateGender(e.target.value)}
                    defaultValue='male'
                  >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div>
              </div>
              <div className='error-messages'>
                <div className='error'>
                  <RegisterError hasError={this.validateAge()} />
                </div>
                <div className='error'>
                  <RegisterError hasError={this.validateGender()} />
                </div>
              </div>
            </div>

            <div className='button-container'>
              <button
                type='button'
                className={
                  unit === "metric"
                    ? "active button unit metric"
                    : "button unit metric"
                }
                value='metric'
                name='unit'
                select='true'
                onClick={e => this.handleUnitSelect(e.target.value)}
              >
                Metric
              </button>
              <button
                type='button'
                className={
                  unit === "imperial"
                    ? "active button unit imperial"
                    : "button unit imperial"
                }
                value='imperial'
                name='unit'
                onClick={e => this.handleUnitSelect(e.target.value)}
              >
                Imperial
              </button>
            </div>
            <div className='physical'>
              <div className='inputs'>
                {this.state.unit.value === "metric" ? (
                  <>
                    <div className=''>
                      <label htmlFor='cm'>Height</label>
                      <br />
                      <input
                        type='number'
                        step='0.01'
                        id='cm'
                        className='height info'
                        min='0'
                        placeHolder='cm'
                        onChange={e => this.updateCm(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className=''>
                      <label htmlFor='ft'>Height</label>
                      <br />
                      <input
                        type='number'
                        id='ft'
                        className='height info'
                        min='0'
                        placeHolder='ft'
                        onChange={e => this.updateFeet(e.target.value)}
                      />
                    </div>

                    <div className=''>
                      <label htmlFor='in'>in</label>
                      <br />
                      <input
                        type='number'
                        id='in'
                        className='height info'
                        min='0'
                        placeHolder='in'
                        onChange={e => this.updateInches(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className=''>
                  <label htmlFor='weight'>Weight</label>
                  <br />
                  <input
                    type='number'
                    step='0.01'
                    id='weight'
                    className='info'
                    min='0'
                    placeHolder={unit === "imperial" ? "lbs" : "kg"}
                    onChange={e => this.updateWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className='error-messages'>
                <div className='error'>
                  <RegisterError hasError={this.validateHeight()} />
                </div>
                <div className='weight'>
                  <RegisterError hasError={this.validateWeight()} />
                </div>
              </div>
            </div>

            <div className=''>
              <label htmlFor='fitness-goals'>Fitness Goals</label>
              <br />
              <select
                name='fitness-goals'
                id='fitness-goals'
                className='goals'
                onChange={e => this.updateGoals(e.target.value)}
              >
                <option value=''>-- Select Goal --</option>
                <option value='maintain'>Maintain weight</option>
                <option value='gain'>Gain weight</option>
                <option value='lose'>Lose weight</option>
              </select>
            </div>
            <div className='error-messages goals-error'>
              <div id='goals-error' className='error-goals'>
                <RegisterError hasError={this.validateGoal()} />
              </div>
            </div>

            <div className='slide-container'>
              <label htmlFor='level-of-activity'>Level of activity</label>

              <input
                id='level-of-activity'
                type='range'
                min='1.2'
                max='1.9'
                className='slider'
                step='.175'
                defaultValue='1.55'
                onChange={e => this.updateActivityLvl(e.target.value)}
                list='defs'
              />
              <datalist id='defs'>
                <option value='1.2'></option>
                <option value='1.375'></option>
                <option value='1.55'></option>
                <option value='1.725'></option>
                <option value='1.9'></option>
              </datalist>
              <RegisterError hasError={this.validateActivityLvl()} />
            </div>

            {/*<div className="lvls">
              <div className="description">
                <p>Sedentary</p>
              </div>
              <div className='description'>
                <p>Lightly Active</p>
              </div>
              <div className='description'>
                <p>Moderately Active</p>
              </div>
              <div className='description'>
                <p>Very Active</p>
              </div>
              <div className='description'>
                <p>Extra Active</p>
              </div>
                </div>*/}
          </div>
          <div className='error'>
            <p>{this.state.error}</p>
          </div>
          <div className='error'>
            <p>{this.state.error}</p>
          </div>
          <button type='submit' className='button register'>
            Register
          </button>
        </form>
      </>
    );
  }
}

Register.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
