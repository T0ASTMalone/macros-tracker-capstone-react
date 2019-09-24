import React, { Component } from 'react';
import './AddFoodItem.css';

export default class AddFoodItem extends Component {
  handleAddExisting = () => {
    this.props.history.push('/user/:id/food-log');
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
          <form action="create-food-item" className="create-food-item">
            <legend>
              <h2>Create Food Item</h2>
            </legend>
            <label htmlFor="food-name">Food Name</label>
            <input type="text" name="food-name" id="food-name" required />
            <label htmlFor="protein">Protein</label>
            <input type="number" id="protein" placeholder="10" required />
            <label htmlFor="carbs">Carbs</label>
            <input type="number" id="carbs" placeholder="10" required />
            <label htmlFor="fats">Fats</label>
            <input type="number" id="fats" placeholder="10" required />
            <button type="submit">Add Food</button>
          </form>
        </section>
        <section>
          <header>
            <h2>Add existing food</h2>
          </header>
          <button className="button" onClick={this.handleAddExisting}>
            Add existing food
          </button>
        </section>
      </>
    );
  }
}
