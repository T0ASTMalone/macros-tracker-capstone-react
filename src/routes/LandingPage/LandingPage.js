import React from 'react';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <>
      <section className="Macrofy">
        <h1 className="title">MacroFy</h1>
        <h3>Make your goals</h3>
        <h3>Then meet your goals</h3>
      </section>
      <section className="about">
        <h2 className="section-title">Make your goals</h2>
        <p>
          Based on your information and your fitness needs Macrofy will
          calculate your daily macro nutrient goals.
        </p>
      </section>
      <section className="keep-track">
        <h2 className="section-title">Keep track of your progress</h2>
        <p>
          Stay on track with the help of charts that show your progress
          throughout the day. Update your macro intake by adding meals to your
          day.
        </p>
      </section>
      <section>
        <h2 className="section-title">Log your meals</h2>
        <p>
          Macrofy provides an interface that allows you to easily search for or
          create new foods and add them to meals, then add those meals to your
          day to meet your macronutrient goals for the day.
        </p>
      </section>
      <section>
        <h2 className="section-title">Start meeting your goals</h2>
        <button>Register</button>
      </section>
    </>
  );
}
