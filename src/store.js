const STORE = {
  users: [
    {
      id: '1',
      email: 'someemail@gmail.com',
      password: '123455667',
      age: '20',
      goals: 'gain',
      weight: 170
    },
    {
      id: '2',
      email: 'thebestemail@gmail.com',
      password: '123455667',
      age: '23',
      goals: 'gain',
      weight: 150
    },
    {
      id: '3',
      email: 'thisisanemail@gmail.com',
      password: '123455667',
      age: '27',
      goals: 'maintain',
      weight: 190
    },
    {
      id: '4',
      email: 'notandemail@gmail.com',
      password: '123455667',
      age: '40',
      goals: 'lose',
      weight: 230
    }
  ],

  macros: [
    {
      id: '1',
      protein: '170',
      carbs: '300',
      fats: '65'
    },
    {
      id: '2',
      protein: '150',
      carbs: '300',
      fats: '65'
    },
    {
      id: '3',
      protein: '190',
      carbs: '300',
      fats: '65'
    },
    {
      id: '4',
      protein: '200',
      carbs: '250',
      fats: '70'
    }
  ],

  todaysMeals: [
    {
      user: '1',
      meal_id: '1',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '2',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '3',
      protein: '0',
      carbs: '1',
      fats: '0',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '4',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    }
  ],

  foods: [
    {
      meal_id: '1',
      food_id: '1',
      food_name: 'rice krispies',
      servings: '10',
      protein: '2',
      carbs: '20',
      fats: '1',
      date: new Date()
    },
    {
      meal_id: '2',
      food_id: '2',
      food_name: 'chocolate',
      servings: '1',
      protein: '2',
      carbs: '20',
      fats: '10',
      date: new Date()
    },
    {
      meal_id: '2',
      food_id: '3',
      food_name: 'ice cream',
      servings: '1',
      protein: '3',
      carbs: '7',
      fats: '7',
      date: new Date()
    },
    {
      meal_id: '3',
      food_id: '4',
      food_name: 'lettuce',
      servings: '100',
      protein: '0',
      carbs: '1',
      fats: '0',
      date: new Date()
    }
  ],

  mealLog: [
    {
      user: '1',
      meal_id: '1',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '2',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '3',
      protein: '0',
      carbs: '1',
      fats: '0',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '4',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '5',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '6',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '7',
      protein: '0',
      carbs: '1',
      fats: '0',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '8',
      protein: '20',
      carbs: '200',
      fats: '10',
      date: new Date()
    }
  ]
};

export default STORE;
