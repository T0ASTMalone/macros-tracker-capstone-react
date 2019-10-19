import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <section className="section Macrofy">
          <h1 className="title">MacroFy</h1>
          <h3>Make your goals</h3>
          <h3>Then meet your goals</h3>
        </section>
        <section className="section about">
          <h2 className="section-title">Make your goals</h2>
          <p>
            Based on your information and your fitness needs Macrofy will
            calculate your daily macro nutrient goals.
          </p>
        </section>
        <section className="section keep-track">
          <h2 className="section-title">Keep track of your progress</h2>
          <p>
            Stay on track with the help of charts that show your progress
            throughout the day. Update your macro intake by adding meals to your
            day.
          </p>
        </section>
        <section className="section">
          <h2 className="section-title">Log your meals</h2>
          <p>
            Macrofy provides an interface that allows you to easily search for
            or create new foods and add them to meals, then add those meals to
            your day to meet your macronutrient goals for the day.
          </p>
        </section>
        <section className="section">
          <h2 className="section-title">Start meeting your goals</h2>
          <Link to={'/register'}>Register</Link>
        </section>
      </>
    );
  }
}
