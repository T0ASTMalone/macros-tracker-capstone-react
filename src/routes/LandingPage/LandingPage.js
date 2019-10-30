import React, { Component } from "react";
import { Link } from "react-router-dom";
import progress from "../../screenshots/styled-screenshots/progress.PNG";
import mealLog from "../../screenshots/styled-screenshots/meal-log.PNG";
import goals from "../../screenshots/styled-screenshots/goals.png";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <div className='landing-page-container'>
        <div className='grid-container'>
          <div id='col-1' className='column'>
            <section id='col-item1' className='section Macrofy'>
              <h1 className='App-title'>MacroFy</h1>
              <h3>Make your goals</h3>
              <h3>Then meet your goals</h3>
            </section>
            <section id='col-item2' className='section about'>
              <h2 className='section-title'>Make your goals</h2>
              <div className='screen-shot-container'>
                <img src={goals} alt='goals' className='screen-shot goals' />
              </div>
              <div className='landing-description'>
                <p>
                  Based on your information and your fitness needs Macrofy will
                  calculate your daily macro nutrient goals.
                </p>
              </div>
            </section>
          </div>
          <div id='col-2' className='column'>
            <section id='col-item3' className='section keep-track'>
              <h2 className='section-title'>Keep track of your progress</h2>
              <div className='section-container'>
                <div className='landing-description'>
                  <p>
                    Stay on track with the help of charts that show your
                    progress throughout the day. Update your macro intake by
                    adding meals to your day.
                  </p>
                </div>
                <div className='screen-shot-container'>
                  <img
                    src={progress}
                    alt='progress'
                    className='screen-shot progress'
                  />
                </div>
              </div>
            </section>
            <section id='col-item4' className='section col-item'>
              <h2 className='section-title'>Log your meals</h2>
              <div className='section-container'>
                <div className='screen-shot-container'>
                  <img
                    src={mealLog}
                    alt='meal-log'
                    className='screen-shot meal-log'
                  />
                </div>
                <div className='landing-description'>
                  <p>
                    Macrofy provides an interface that allows you to easily
                    search for or create new foods and add them to meals, then
                    add those meals to your day to meet your macronutrient goals
                    for the day.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <section id='get-started' className='section'>
          <h2 className='section-title'>Start meeting your goals</h2>
          <Link to={"/register"}>Register</Link>
          <p className=''>or</p>
          <Link to={"/sign-in"}>Sign In</Link>
        </section>
      </div>
    );
  }
}
