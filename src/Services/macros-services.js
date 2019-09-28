const MacrosService = {
  macrosSoFar(meals, usrMacros) {
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    meals.forEach(meal => {
      protein += parseInt(meal.protein);
      carbs += parseInt(meal.carbs);
      fats += parseInt(meal.fats);
    });

    const proteinPercent = Math.round((protein / usrMacros.protein) * 100);
    const carbsPercent = Math.round((carbs / usrMacros.carbs) * 100);
    const fatsPercent = Math.round((fats / usrMacros.fats) * 100);

    const macros = { proteinPercent, carbsPercent, fatsPercent };

    if (macros.proteinPercent > 100) {
      macros.proteinPercent = 100;
    }
    if (macros.carbsPercent > 100) {
      macros.carbsPercent = 100;
    }
    if (macros.fatsPercent > 100) {
      macros.fatsPercent = 100;
    }
    return macros;
  },

  totalMealMacros(foods) {
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    foods.forEach(food => {
      protein += parseInt(food.protein) * parseInt(food.servings);
      carbs += parseInt(food.carbs) * parseInt(food.servings);
      fats += parseInt(food.fats) * parseInt(food.servings);
    });
    const macros = { protein, carbs, fats };
    return macros;
  },

  totalFoodMacros(food) {
    let protein = 0;
    let carbs = 0;
    let fats = 0;
  }
};

export default MacrosService;
