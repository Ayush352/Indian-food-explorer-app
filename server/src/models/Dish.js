// Placeholder schema for future DB (MongoDB/SQL ready)
class Dish {
  constructor({ id, name, ingredients, diet, prep_time, cook_time, flavor_profile, course, state, region }) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.diet = diet;
    this.prep_time = prep_time;
    this.cook_time = cook_time;
    this.flavor_profile = flavor_profile;
    this.course = course;
    this.state = state;
    this.region = region;
  }
}

module.exports = Dish;
