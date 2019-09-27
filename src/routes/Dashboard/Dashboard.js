import React from 'react';
import './Dashboard.css';
import Overview from '../../Components/Overview/Overview';
import TodaysMeals from '../../Components/TodaysMeals/TodaysMeals';
import Stats from '../../Components/Stats/Stats';
import STORE from '../../store';
import MealListContext from '../../context/MealLIstContext';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static contextType = MealListContext;

  componentDidMount() {
    if (this.context.mealList < 1) {
      const meals = STORE.todaysMeals;
      this.context.setMealList(meals);
    }
  }

  render() {
    return (
      <>
        <div className="overview">
          <Overview radius={60} stroke={8} progress={100} class="protein" />
          <Overview radius={60} stroke={8} progress={60} class="carbs" />
          <Overview radius={60} stroke={8} progress={40} class="fats" />
        </div>
        <section className="todays meals">
          <TodaysMeals />
        </section>
        <section>
          <Stats />
        </section>
      </>
    );
  }
}
