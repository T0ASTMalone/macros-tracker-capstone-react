import React from 'react';
import './Dashboard.css';
import Overview from '../../Components/Overview/Overview';
import TodaysMeals from '../../Components/TodaysMeals/TodaysMeals';
import Stats from '../../Components/Stats/Stats';

export default class Dashboard extends React.Component {
  render() {
    console.log(this.props.history);
    return (
      <>
        <div className="overview">
          <Overview radius={60} stroke={8} progress={75} class="protein" />
          <Overview radius={60} stroke={8} progress={80} class="carbs" />
          <Overview radius={60} stroke={8} progress={35} class="fats" />
        </div>
        <section className="todays meals">
          <TodaysMeals history={this.props.history} />
        </section>
        <section>
          <Stats />
        </section>
      </>
    );
  }
}
