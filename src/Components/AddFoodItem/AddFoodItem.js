import React, { Component } from 'react';
import './AddFoodItem.css';
import AddFoodItemError from './AddFoodItemError';
import { Link } from 'react-router-dom';

export default class AddFoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: {
        value: '',
        touched: false
      },
      protein: {
        value: '',
        touched: false
      },
      carbs: {
        value: '',
        touched: false
      },
      fats: {
        value: '',
        touched: false
      },
      servings: {
        value: '',
        touched: false
      }
    };
  }

  handleAddExisting = () => {
    //this.props.history.push('/user/:id/food-log');
    return (
      <Link addFoodItem={this.props.addFoodItem} to="/user/:id/food-log" />
    );
  };

  updateFoodName = name => {
    this.setState({ foodName: { value: name, touched: true } });
  };

  updateProtein = g => {
    this.setState({ protein: { value: g, touched: true } });
  };

  updateCarbs = g => {
    this.setState({ carbs: { value: g, touched: true } });
  };

  updateFats = g => {
    this.setState({ fats: { value: g, touched: true } });
  };

  updateServings = num => {
    this.setState({ servings: { value: num, touched: true } });
  };

  validateFoodName() {
    let name = this.state.foodName.value;
    if (name.length < 1) {
      return 'A food name is required';
    }
  }

  validateProtein() {
    let protein = this.state.protein.value;
    if (protein.length < 1) {
      return 'A protein amount is required';
    }
  }

  validateCarbs() {
    let carbs = this.state.carbs.value;
    if (carbs.length < 1) {
      return 'A carbs amount is required';
    }
  }

  validateFats() {
    let fatsValue = this.state.fats.value;
    if (fatsValue.length < 1) {
      return 'A fats amount is required';
    }
  }
  validateServings() {
    let servings = this.state.servings.value;
    if (servings.length < 1) {
      return 'A servings amount is required';
    }
  }

  handleCreateFoodSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <>
        <section>
          <form action="search">
            <legend>
              <h2>Search for foods</h2>
            </legend>
            <input type="text" placeholder="Food name" />
            <button type="submit">Search</button>
          </form>
          <div className="search-results"></div>
        </section>

        <section>
          <form
            action="create-food-item"
            className="create-food-item"
            onSubmit={this.handleCreateFoodSubmit}
          >
            <legend>
              <h2>Create Food Item</h2>
            </legend>
            <label htmlFor="food-name">Food Name</label>
            <input
              type="text"
              name="food-name"
              id="food-name"
              //required
              onChange={e => this.updateFoodName(e.target.value)}
            />
            <AddFoodItemError
              hasError={this.validateFoodName()}
              touched={this.state.foodName.touched}
            />
            <label htmlFor="protein">Protein</label>
            <input
              type="number"
              id="protein"
              min="1"
              placeholder="10"
              //required
              onChange={e => this.updateProtein(e.target.value)}
            />
            <AddFoodItemError
              hasError={this.validateProtein()}
              touched={this.state.protein.touched}
            />
            <label htmlFor="carbs">Carbs</label>
            <input
              type="number"
              id="carbs"
              min="1"
              placeholder="10"
              //required
              onChange={e => this.updateCarbs(e.target.value)}
            />
            <AddFoodItemError
              hasError={this.validateCarbs()}
              touched={this.state.carbs.touched}
            />
            <label htmlFor="fats">Fats</label>
            <input
              type="number"
              id="fats"
              min="1"
              placeholder="10"
              //required
              onChange={e => this.updateFats(e.target.value)}
            />
            <AddFoodItemError
              hasError={this.validateFats()}
              touched={this.state.fats.touched}
            />
            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              id="servings"
              placeholder="1"
              min="1"
              //required
              onChange={e => this.updateServings(e.target.value)}
            />
            <AddFoodItemError
              hasError={this.validateServings()}
              touched={this.state.servings.touched}
            />
            <button
              type="submit"
              disabled={
                this.validateCarbs() ||
                this.validateFats() ||
                this.validateFoodName() ||
                this.validateProtein() ||
                this.validateServings()
              }
            >
              Add Food
            </button>
          </form>
        </section>
        <section>
          <header>
            <h2>Add existing food</h2>
          </header>
          {console.log(this.props.location.state)}
          <button className="button">
            <Link to="/user/:id/food-log">Add existing food</Link>
          </button>
        </section>
      </>
    );
  }
}
