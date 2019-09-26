import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { MealProvider } from './context/MealContext';
import { MealListProvider } from './context/MealLIstContext';

ReactDOM.render(
  <BrowserRouter>
    <MealListProvider>
      <MealProvider>
        <App />
      </MealProvider>
    </MealListProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
