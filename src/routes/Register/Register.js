import React from "react";
import PropTypes from "prop-types";
import "./Register.css";
import RegisterError from "./RegisterError";
import convert from "convert-units";
import AuthApiService from "../../Services/auth-api-services";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      .then(() => {
        this.clearValues();
        this.props.refresh();
      })
      .catch(res => {
        console.log(res);
      });
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
    this.setState({ cm: { value: "", touched: true } });
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
      return "An password is required";
    }
  }
  validateConfirmPassword() {
    const confirmPassword = this.state.confirmPassword.value;
    if (confirmPassword < 1) {
      return "You must confirm the password";
    }
  }
  validateGoal() {
    const goal = this.state.goals.value;
    if (goal < 1) {
      return "An goal is required";
    }
  }
  validateHeight() {
    const height = this.state.feet.value;
    if (height < 1) {
      return "An height is required";
    }
  }
  validateWeight() {
    const weight = this.state.weight.value;
    if (weight < 1) {
      return "An weight is required";
    }
  }
  validateGender() {
    const gender = this.state.gender.value;
    if (gender < 1) {
      return "An gender is required";
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
    return (
      <>
        <form
          action='register-user'
          className='register-user'
          onSubmit={this.handleSubmit}
        >
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            required
            onChange={e => this.updateEmail(e.target.value)}
          />
          <RegisterError hasError={this.validateEmail()} />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            required
            onChange={e => this.updatePassword(e.target.value)}
          />
          <RegisterError hasError={this.validatePassword()} />
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            id='confirm-password'
            required
            onChange={e => this.updateConfirmPassword(e.target.value)}
          />
          <RegisterError hasError={this.validateConfirmPassword()} />
          <div className='user-info'>
            <label htmlFor='age'>Age</label>
            <input
              type='number'
              min='16'
              id='age'
              onChange={e => this.updateAge(e.target.value)}
            />
            <RegisterError hasError={this.validateAge()} />
            <label htmlFor='gender'>Gender</label>
            <select
              id='gender'
              onChange={e => this.updateGender(e.target.value)}
              defaultValue='male'
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            <RegisterError hasError={this.validateGender()} />
            <div className='button-container'>
              <button
                type='button'
                className='button metric'
                value='metric'
                name='unit'
                select='true'
                onClick={e => this.handleUnitSelect(e.target.value)}
              >
                Metric
              </button>
              <button
                type='button'
                className='button imperial'
                value='imperial'
                name='unit'
                onClick={e => this.handleUnitSelect(e.target.value)}
              >
                Imperial
              </button>
            </div>

            <label htmlFor='height'>Height</label>
            {this.state.unit.value === "metric" ? (
              <>
                <label htmlFor='cm'>cm</label>
                <input
                  type='number'
                  id='cm'
                  className='height'
                  min='0'
                  onChange={e => this.updateCm(e.target.value)}
                />
              </>
            ) : (
              <>
                <label htmlFor='ft'>ft</label>
                <input
                  type='number'
                  id='ft'
                  className='height'
                  min='0'
                  onChange={e => this.updateFeet(e.target.value)}
                />
                <label htmlFor='in'>in</label>
                <input
                  type='number'
                  id='in'
                  className='height'
                  min='0'
                  onChange={e => this.updateInches(e.target.value)}
                />
                <RegisterError hasError={this.validateHeight()} />
              </>
            )}

            <label htmlFor='weight'>Weight</label>
            <input
              type='number'
              id='weight'
              min='0'
              onChange={e => this.updateWeight(e.target.value)}
            />
            <RegisterError hasError={this.validateWeight()} />
            <div className='slidecontainer'>
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
                list='volsettings'
              />
              <datalist id='volsettings'>
                <option value='1.2'>0</option>
                <option value='1.375'>1</option>
                <option value='1.55'>2</option>
                <option value='1.725'>3</option>
                <option value='1.9'>4</option>
              </datalist>
              <RegisterError hasError={this.validateActivityLvl()} />
            </div>
            <label htmlFor='fitness-goals'>Fitness Goals</label>
            <select
              name='fitness-goals'
              id='fitness-goals'
              onChange={e => this.updateGoals(e.target.value)}
            >
              <option value='maintain'>Maintain weight</option>
              <option value='gain'>Gain weight</option>
              <option value='lose'>Lose weight</option>
            </select>
            <RegisterError hasError={this.validateGoal()} />
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
