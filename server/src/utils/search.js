// Suggest dishes based on available ingredients
exports.filterByIngredients = (dishes, ingredients) => {
  return dishes.filter(dish =>
    ingredients.every(ing =>
      dish.ingredients.toLowerCase().includes(ing.toLowerCase())
    )
  );
};
