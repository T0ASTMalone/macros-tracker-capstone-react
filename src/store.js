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
      carbs: '318',
      fats: '68'
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
      meal_id: '3',
      meal_name: 'Salad',
      protein: '3',
      carbs: '6',
      fats: '13',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '4',
      meal_name: 'Grilled Chicken with Black Beans and Rice',
      protein: '35',
      carbs: '31',
      fats: '5',
      date: new Date()
    }
  ],

  foods: [

    {
      meal_id: '1',
      food_id: '9',
      food_name: 'Shake',
      servings: '1',
      protein: '12',
      carbs: '56',
      fats: '9',
      date: new Date()
    },
    {
      meal_id: '5',
      food_id: '1',
      food_name: 'Rice krispies',
      servings: '10',
      protein: '2',
      carbs: '20',
      fats: '1',
      date: new Date()
    },
    {
      meal_id: '5',
      food_id: '2',
      food_name: 'Chocolate',
      servings: '1',
      protein: '3',
      carbs: '25',
      fats: '13',
      date: new Date()
    },
    {
      meal_id: '5',
      food_id: '3',
      food_name: 'Ice cream',
      servings: '1',
      protein: '2',
      carbs: '17',
      fats: '7',
      date: new Date()
    },
    {
      meal_id: '3',
      food_id: '4',
      food_name: 'Lettuce',
      servings: '100',
      protein: '0',
      carbs: '2',
      fats: '0',
      date: new Date()
    },
    {
      meal_id: '2',
      food_id: '5',
      food_name: 'Twinkies',
      servings: '1',
      protein: '1',
      carbs: '23',
      fats: '4',
      date: new Date()
    },
    {
      meal_id: '4',
      food_id: '6',
      food_name: 'Chicken',
      servings: '1',
      protein: '19',
      carbs: '0',
      fats: '2'
    },
    {
      meal_id: '4',
      food_id: '7',
      food_name: 'Rice',
      servings: '2',
      protein: '4',
      carbs: '53',
      fats: '0'
    },
    {
      meal_id: '4',
      food_id: '8',
      food_name: 'Black Beans',
      servings: '1',
      protein: '7',
      carbs: '20',
      fats: '1'
    }
  ],

  mealLog: [
    {
      user: '1',
      meal_id: '1',
      meal_name: 'Shake',
      protein: '12',
      carbs: '56',
      fats: '9',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '2',
      meal_name: 'Twinkies',
      protein: '1',
      carbs: '23',
      fats: '4',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '3',
      meal_name: 'Salad',
      protein: '3',
      carbs: '6',
      fats: '13',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '4',
      meal_name: 'Grilled Chicken with Black Beans and Rice',
      protein: '35',
      carbs: '31',
      fats: '5',
      date: new Date()
    },
    {
      user: '1',
      meal_id: '5',
      meal_name: 'Desert',
      protein: '7',
      carbs: '62',
      fats: '21'
    }
  ]
};

export default STORE;
