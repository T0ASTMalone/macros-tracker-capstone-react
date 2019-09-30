import React from 'react';
import './Dashboard.css';
import Overview from '../../Components/Overview/Overview';
import TodaysMeals from '../../Components/TodaysMeals/TodaysMeals';
import Stats from '../../Components/Stats/Stats';
import STORE from '../../store';
import MealListContext from '../../context/MealLIstContext';
import MacrosService from '../../Services/macros-services';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userMacros: []
    };
  }

  static contextType = MealListContext;

  componentDidMount() {
    if (this.context.mealList < 1) {
      const meals = STORE.todaysMeals;
      this.context.setMealList(meals);
    }

    const userMacros = STORE.macros[1];
    this.context.setUserMacros(userMacros);
  }

  getProgress() {
    const macros = MacrosService.macrosSoFar(
      this.context.mealList,
      this.context.userMacros
    );
    return macros;
  }

  render() {
    let progress = {
      macrosPercent: { proteinPercent: 0, carbsPercent: 0, fatsPercent: 0 }
    };
    if (this.context.mealList.length >= 1) {
      progress = this.getProgress();
    }
    return (
      <>
        <div className="overview">
          <Overview
            radius={60}
            stroke={8}
            progress={progress.macrosPercent.proteinPercent}
            class="protein"
          />
          <Overview
            radius={60}
            stroke={8}
            progress={progress.macrosPercent.carbsPercent}
            class="carbs"
          />
          <Overview
            radius={60}
            stroke={8}
            progress={progress.macrosPercent.fatsPercent}
            class="fats"
          />
        </div>
        <section className="todays meals">
          <TodaysMeals />
        </section>
        <section>
          <Stats macros={this.context.userMacros} progress={progress.macros} />
        </section>
      </>
    );
  }
}
