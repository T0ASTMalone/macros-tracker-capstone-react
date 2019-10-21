import TokenService from '../Services/token-service';
import config from '../config';

const MacroFyServices = {
  getAllMeals(id) {
    const user = { user_id: id };
    return fetch(`${config.API_ENDPOINT}/meals`, {
      headers: {
        user,
        'Content-Type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getTodaysMeals(id) {
    return fetch(`${config.API_ENDPOINT}/meals/${id}/today`, {
      headers: {
        method: 'GET',
        'Content-Type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getAllFoods(id) {
    const user = { user_id: id };
    return fetch(`${config.API_ENDPOINT}/foods`, {
      headers: {
        method: 'GET',
        user,
        'Content-Type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getMealFoods(meal_id) {
    return fetch(`${config.API_ENDPOINT}/meals/${meal_id}/foods`, {
      headers: {
        method: 'GET',
        'Content-Type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getUserInfo(id) {
    return fetch(`${config.API_ENDPOINT}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postMeal(meal) {
    return fetch(`${config.API_ENDPOINT}/meals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(meal)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postFoods(foods) {
    return fetch(`${config.API_ENDPOINT}/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(foods)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default MacroFyServices;
