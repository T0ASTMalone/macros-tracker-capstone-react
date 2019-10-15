import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';
import Overview from '../../Components/Overview/Overview';
import Stats from '../../Components/Stats/Stats';
import MealListContext from '../../context/MealLIstContext';
import MacrosService from '../../Services/macros-services';
import AddMeal from '../../Components/AddMeal/AddMeal';
import FoodLog from '../../Components/FoodLog/FoodLog';
import MealLog from '../../Components/MealLog/MealLog';
import AddFoodItem from '../../Components/AddFoodItem/AddFoodItem';
import MacroFyServices from '../../Services/macrofy-api-service';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showAddFoodItem: false,
      showFoodLog: false,
      showMealLog: false,
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

  showAddFoodItem = () => {
    this.setState({
      showAddFoodItem: true,
      showFoodLog: false,
      showMealLog: false
    });
  };

  showFoodLog = () => {
    this.setState({
      showFoodLog: true,
      showMealLog: false,
      showAddFoodItem: false
    });
  };
  showMealLog = () => {
    this.setState({
      showMealLog: true,
      showFoodLog: false,
      showAddFoodItem: false
    });
  };

  hideContent = name => {
    this.setState({ [name]: false });
  };

  render() {
    const show = {
      showAddFood: this.showAddFoodItem,
      showMealLog: this.showMealLog
    };
    let progress = {
      macrosPercent: { proteinPercent: 0, carbsPercent: 0, fatsPercent: 0 }
    };
    if (this.context.mealList.length >= 1) {
      progress = this.getProgress();
    }
    return (
      <>
        <div className="overview">
          <h2>Progress</h2>
          <div className="overview-container">
            <Overview
              radius={60}
              stroke={8}
              name="P"
              progress={progress.macrosPercent.proteinPercent}
              class="protein"
            />
            <Overview
              radius={60}
              stroke={8}
              progress={progress.macrosPercent.carbsPercent}
              class="carbs"
              name="C"
            />
            <Overview
              radius={60}
              stroke={8}
              progress={progress.macrosPercent.fatsPercent}
              class="fats"
              name="F"
            />
          </div>
        </div>
        <section className="todays meals">
          <AddMeal show={show} />
          {this.state.showAddFoodItem && (
            <AddFoodItem
              showFoodLog={this.showFoodLog}
              hide={this.hideContent}
            />
          )}
          {this.state.showFoodLog && <FoodLog hide={this.hideContent} />}
          {this.state.showMealLog && <MealLog hide={this.hideContent} />}
        </section>
        <section>
          <Stats macros={this.context.userMacros} progress={progress.macros} />
        </section>
      </>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
