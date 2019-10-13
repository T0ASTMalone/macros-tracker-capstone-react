require('dotenv').config();

export default {
  FOOD_API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
  API_ENDPOINT: process.env.REACT_APP_MACROFY_API_ENDPOINT,
  API_KEY: process.env.REACT_APP_API_KEY,
  TOKEN_KEY: 'macrofy-auth-token'
};
