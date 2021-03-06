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
    if (this.validateSearchTerm()) {
      this.setState({ error: this.validateSearchTerm() });
    } else {
      const url =
        config.FOOD_API_ENDPOINT +
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
            : this.setState({
                error: 'A food item by that name was not found'
              });
        })
        .catch(error => console.error(error));
    }
  };

  updateSearchTerm = term => {
    this.setState({ searchTerm: { value: term, touched: true } });
  };

  validateSearchTerm = () => {
    const searchTerm = this.state.searchTerm.value;
    if (searchTerm.length < 1) {
      return 'A search term is required';
    }
  };

  render() {
    const results = this.state.searchResults;
    return (
      <>
        <form action="search" onSubmit={this.handleSearch}>
          <legend>
            <h2 className="section-title">Search for foods</h2>
          </legend>
          <div className="food-search">
            {this.state.error ? (
              <p className="error">{this.state.error}</p>
            ) : (
              <></>
            )}
            <input
              type="text"
              className="search-bar input"
              onChange={e => this.updateSearchTerm(e.target.value)}
              placeholder="Food name"
            />
            <button className="search-button button" type="submit">
              Search
            </button>
          </div>
        </form>
        {results.length >= 1 ? (
          <div className="search-results">
            {results.map((food, i) => {
              return (
                <div key={food.id} className="food-item-container">
                  {food.image !== undefined ? (
                    <img
                      className="food-img"
                      src={food.image}
                      alt={food.name}
                    />
                  ) : (
                    <></>
                  )}
                  <FoodItem name={food.title} image={food.image} />
                  <AddFoodLogItem hide={this.props.hide} foodId={food.id} />
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

SearchBar.propTypes = {
  hide: PropTypes.func.isRequired
};
