import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../../config';
import './SearchFoods.css';
import FoodItem from '../FoodItem/FoodItem';
import AddFoodLogItem from '../AddFoodLogItem/AddFoodLogItem';

export default class SearchBar extends Component {
  state = {
    error: null,
    searchResults: [],
    searchTerm: {
      value: '',
      touched: false
    }
  };

  handleSearch = ev => {
    ev.preventDefault();
    const url =
      config.API_ENDPOINT +
      `search?query=${this.state.searchTerm.value}&apiKey=${config.API_KEY}`;
    fetch(url, {
      method: 'GET'
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(resJson => {
        resJson.products.length >= 1
          ? this.setState({ searchResults: resJson.products })
          : this.setState({ error: 'A food item by that name was not found' });
      })
      .catch(error => console.error(error));
  };

  updateSearchTerm = term => {
    this.setState({ searchTerm: { value: term, touched: true } });
  };

  render() {
    const results = this.state.searchResults;
    return (
      <>
        <form action="search" onSubmit={this.handleSearch}>
          <legend>
            <h2>Search for foods</h2>
          </legend>
          <input
            type="text"
            onChange={e => this.updateSearchTerm(e.target.value)}
            placeholder="Food name"
          />
          <button type="submit">Search</button>
        </form>
        {results.length >= 1 ? (
          <div className="search-results">
            {results.map((food, i) => {
              return (
                <div key={food.id} className="food-item-container">
                  <FoodItem name={food.title} image={food.image} />
                  <AddFoodLogItem hide={this.props.hide} foodId={food.id} />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <p className="error">{this.state.error}</p>
          </>
        )}
      </>
    );
  }
}

SearchBar.propTypes = {
  hide: PropTypes.func.isRequired
};
