import React, { Component } from 'react';
import './AddFoodItem.css';
import AddFoodItemError from './AddFoodItemError';
import MealsContext from '../../context/MealContext';
import SearchFoods from '../SearchFoods/SearchFoods';
import MacrosService from '../../Services/macros-services';

export default class AddFoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food_name: {
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

  static contextType = MealsContext;

  updateFoodName = name => {
    this.setState({ food_name: { value: name, touched: true } });
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
    let name = this.state.food_name.value;
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
    const newFood = {
      food_name: this.state.food_name.value,
      protein: this.state.protein.value,
      carbs: this.state.carbs.value,
      fats: this.state.fats.value,
      servings: this.state.servings.value
    };
    MacrosService.totalFoodMacros(newFood);
    const foodArr = [newFood]
    this.context.addFood(foodArr);
    this.props.hide('showAddFoodItem');
  };

  handleRedirect = () => {
    this.props.showFoodLog();
  };

  render() {
    return (
      <div className="container">
        <section>
          <SearchFoods hide={this.props.hide} />
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
              touched={this.state.food_name.touched}
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
              min="0"
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
              min="0"
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
          <button className="button" onClick={this.handleRedirect}>
            Add existing food
          </button>
        </section>
      </div>
    );
  }
}
