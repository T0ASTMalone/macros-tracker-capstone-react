const MacrosService = {
  macrosSoFar(meals, usrMacros) {
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    meals.forEach(meal => {
      protein += parseInt(meal.protein) || 0;
      carbs += parseInt(meal.carbs) || 0;
      fats += parseInt(meal.fats) || 0;
    });

    const macros = { protein, carbs, fats };

    const proteinPercent = Math.round((protein / usrMacros.protein) * 100);
    const carbsPercent = Math.round((carbs / usrMacros.carbs) * 100);
    const fatsPercent = Math.round((fats / usrMacros.fats) * 100);

    const macrosPercent = { proteinPercent, carbsPercent, fatsPercent };

    if (macrosPercent.proteinPercent > 100) {
      macrosPercent.proteinPercent = 100;
    }
    if (macrosPercent.carbsPercent > 100) {
      macrosPercent.carbsPercent = 100;
    }
    if (macrosPercent.fatsPercent > 100) {
      macrosPercent.fatsPercent = 100;
    }

    return { macrosPercent, macros };
  },

  totalMealMacros(foods) {
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    foods.forEach(food => {
      protein += parseInt(food.protein);
      carbs += parseInt(food.carbs);
      fats += parseInt(food.fats);
    });
    const macros = { protein, carbs, fats };
    return macros;
  },

  totalFoodMacros(food) {
    Object.keys(food).map(key => {
      if (key === 'protein' || key === 'carbs' || key === 'fats') {
        food[key] = parseInt(food.servings) * parseInt(food[key]);
      }
      return key;
    });
  }
};

export default MacrosService;
