import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';
import Overview from '../../Components/Overview/Overview';
import MealListContext from '../../context/MealLIstContext';
import MacrosService from '../../Services/macros-services';
import AddMeal from '../../Components/AddMeal/AddMeal';
import FoodLog from '../../Components/FoodLog/FoodLog';
import MealLog from '../../Components/MealLog/MealLog';
import AddFoodItem from '../../Components/AddFoodItem/AddFoodItem';
import MacroFyServices from '../../Services/macrofy-api-service';
import PopUp from '../../Components/utils/PopUp';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showPopUp: false,
      userMacros: []
    };
  }

  static contextType = MealListContext;

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (this.context.mealList.length < 1) {
      const meals = await MacroFyServices.getTodaysMeals(id);
      await this.getUserInfo(id);
      this.context.setMealList(meals);
    }
  }

  getUserInfo = id => {
    return MacroFyServices.getUserInfo(id).then(res => {
      const { protein, carbs, fats, user_id } = res;
      const userMacros = { protein, carbs, fats };
      const userId = user_id;
      this.context.setUserInfo(userMacros, userId);
    });
  };

  getProgress() {
    const macros = MacrosService.macrosSoFar(
      this.context.mealList || [],
      this.context.userMacros || { protein: 0, carbs: 0, fats: 0 }
    );
    return macros;
  }

  showPopUp = component => {
    switch (component) {
      case 'Add':
        this.setState({ component: AddFoodItem, showPopUp: true });
        break;
      case 'FoodLog':
        this.setState({ component: FoodLog, showPopUp: true });
        break;
      case 'MealLog':
        this.setState({ component: MealLog, showPopUp: true });
        break;
      default:
        this.setState({ error: 'sorry something when wrong' });
    }
  };

  hidePopUp = async () => {
    const id = this.props.match.params.id;
    this.context.clearMeals();
    const meals = await MacroFyServices.getTodaysMeals(id);
    await this.getUserInfo(id);
    this.context.setMealList(meals);
    this.setState({ component: '', showPopUp: false });
  };

  render() {
    const show = {
      showPopUp: component => this.showPopUp(component)
    };
    let progress = {
      macrosPercent: { proteinPercent: 0, carbsPercent: 0, fatsPercent: 0 }
    };
    if (this.context.mealList.length >= 1) {
      progress = this.getProgress();
    }

    console.log(progress.macros);
    return (
      <div id="dashboard">
        <div id="overview-background" className="back-background">
          <div id="overview" className="overview dash-section">
            <h2 className="section-title">Progress</h2>
            <div className="overview-container">
              <Overview
                radius={window.innerWidth > 750 ? 60 : 50}
                stroke={8}
                name="P"
                progress={progress.macrosPercent.proteinPercent}
                macro="protein"
                mSoFar={progress.macros}
                total={this.context.userMacros.protein}
              />
              <Overview
                radius={window.innerWidth > 750 ? 60 : 50}
                stroke={8}
                progress={progress.macrosPercent.carbsPercent}
                macro="carbs"
                name="C"
                mSoFar={progress.macros}
                total={this.context.userMacros.carbs}
              />
              <Overview
                radius={window.innerWidth > 750 ? 60 : 50}
                stroke={8}
                progress={progress.macrosPercent.fatsPercent}
                macro="fats"
                name="F"
                mSoFar={progress.macros}
                total={this.context.userMacros.fats}
              />
            </div>
          </div>
        </div>
        <div id="builder-background" className="back-background">
          <section id="meal-builder" className="dash-section">
            <AddMeal show={show} />
            {this.state.showPopUp && (
              <PopUp
                hide={this.hidePopUp}
                showPopUp={component => this.showPopUp(component)}
                component={this.state.component}
              />
            )}
          </section>
        </div>
        <footer></footer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
