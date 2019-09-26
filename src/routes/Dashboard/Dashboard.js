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
      todaysMeals: [],
      usersMacros: {},
      macrosSoFar: []
    };
  }

  static contextType = MealListContext;

  componentDidMount() {
    const meals = STORE.todaysMeals;
    const { protein, carbs, fats } = STORE.macros[1];
    this.context.setMealList(meals);
    const macros = { protein, carbs, fats };
    console.log(macros)
    //this.setState({ usersMacros: macros });
  }

  calculateMacrosSoFar() {
    const meals = this.state.todaysMeals;
    let protein = 0;
    let carbs = 0;
    let fats = 0;
    for (let i = 0; i < meals.length; ++i) {
      const meal = meals[i];
      for (let k in meal) {
        if (k === 'protein') protein += parseInt(meals[i].protein);
        if (k === 'carbs') carbs += parseInt(meals[i].carbs);
        if (k === 'fats') fats += parseInt(meals[i].fats);
      }
    }

    console.log(protein, fats, carbs);
    return { protein };
  }

  renderMeals() {
    const { mealsList = [] } = this.context;
    return <TodaysMeals meals={mealsList} />;
  }

  render() {
    if (this.state.todaysMeals.length > 0) {
      this.calculateMacrosSoFar();
    }
    return (
      <>
        <div className="overview">
          <Overview radius={60} stroke={8} progress={100} class="protein" />
          <Overview radius={60} stroke={8} progress={60} class="carbs" />
          <Overview radius={60} stroke={8} progress={40} class="fats" />
        </div>
        <section className="todays meals">
          {this.renderMeals()}
          {/*<TodaysMeals history={this.props.history} />*/}
        </section>
        <section>
          <Stats />
        </section>
      </>
    );
  }
}
