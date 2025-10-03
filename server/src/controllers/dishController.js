const dishes = require("../data/indian_food.json");
const { filterByIngredients } = require("../utils/search");

// Get all dishes
exports.getAllDishes = (req, res) => {
  res.json(dishes);
};

// Get dish by ID
exports.getDishById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < dishes.length) {
    res.json(dishes[id]);
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
};

// Suggest dishes by ingredients
exports.suggestDishes = (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ message: "Ingredients must be an array" });
  }

  const matches = dishes
    .map((dish, index) => ({ id: index, ...dish })) // add id here
    .filter((dish) =>
      ingredients.every((i) =>
        dish.ingredients.toLowerCase().includes(i.toLowerCase())
      )
    );

  res.json(matches);
};

