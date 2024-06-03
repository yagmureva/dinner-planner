import express from "express";
import knex from "../database_client.js";

const nestedRouter = express.Router();

// Users CRUD işlemleri

// Kullanıcıları listeleme (Read)
nestedRouter.get("/users", async (req, res) => {
  try {
    const users = await knex("Users").select("*");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yeni kullanıcı ekleme (Create)
nestedRouter.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [user] = await knex("Users")
      .insert({ username, email, password })
      .returning("*");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kullanıcı güncelleme (Update)
nestedRouter.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const [user] = await knex("Users")
      .where("user_id", id)
      .update({ username, email, password })
      .returning("*");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kullanıcı silme (Delete)
nestedRouter.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Users").where("user_id", id).del();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recipes CRUD işlemleri

// Tarifleri listeleme (Read)
nestedRouter.get("/recipes", async (req, res) => {
  try {
    const recipes = await knex("Recipes").select("*");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yeni tarif ekleme (Create)
nestedRouter.post("/recipes", async (req, res) => {
  const { name, description, prep_time, cook_time, user_id } = req.body;
  try {
    const [recipe] = await knex("Recipes")
      .insert({ name, description, prep_time, cook_time, user_id })
      .returning("*");
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tarif güncelleme (Update)
nestedRouter.put("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, prep_time, cook_time, user_id } = req.body;
  try {
    const [recipe] = await knex("Recipes")
      .where("recipe_id", id)
      .update({ name, description, prep_time, cook_time, user_id })
      .returning("*");
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tarif silme (Delete)
nestedRouter.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Recipes").where("recipe_id", id).del();
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ingredients CRUD işlemleri

// Malzemeleri listeleme (Read)
nestedRouter.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await knex("Ingredients").select("*");
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yeni malzeme ekleme (Create)
nestedRouter.post("/ingredients", async (req, res) => {
  const { name } = req.body;
  try {
    const [ingredient] = await knex("Ingredients")
      .insert({ name })
      .returning("*");
    res.json(ingredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Malzeme güncelleme (Update)
nestedRouter.put("/ingredients/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [ingredient] = await knex("Ingredients")
      .where("ingredient_id", id)
      .update({ name })
      .returning("*");
    res.json(ingredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Malzeme silme (Delete)
nestedRouter.delete("/ingredients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Ingredients").where("ingredient_id", id).del();
    res.json({ message: "Ingredient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RecipeIngredients CRUD işlemleri

// Tarif malzemelerini listeleme (Read)
nestedRouter.get("/recipe-ingredients", async (req, res) => {
  try {
    const recipeIngredients = await knex("RecipeIngredients").select("*");
    res.json(recipeIngredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yeni tarif malzemesi ekleme (Create)
nestedRouter.post("/recipe-ingredients", async (req, res) => {
  const { recipe_id, ingredient_id, quantity, measurement_unit } = req.body;
  try {
    const [recipeIngredient] = await knex("RecipeIngredients")
      .insert({ recipe_id, ingredient_id, quantity, measurement_unit })
      .returning("*");
    res.json(recipeIngredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tarif malzemesi güncelleme (Update)
nestedRouter.put("/recipe-ingredients/:id", async (req, res) => {
  const { id } = req.params;
  const { recipe_id, ingredient_id, quantity, measurement_unit } = req.body;
  try {
    const [recipeIngredient] = await knex("RecipeIngredients")
      .where("recipe_ingredient_id", id)
      .update({ recipe_id, ingredient_id, quantity, measurement_unit })
      .returning("*");
    res.json(recipeIngredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tarif malzemesi silme (Delete)
nestedRouter.delete("/recipe-ingredients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("RecipeIngredients").where("recipe_ingredient_id", id).del();
    res.json({ message: "Recipe ingredient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MealPlan CRUD işlemleri

// Yemek planlarını listeleme (Read)
nestedRouter.get("/meal-plans", async (req, res) => {
  try {
    const mealPlans = await knex("MealPlan").select("*");
    res.json(mealPlans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yeni yemek planı ekleme (Create)
nestedRouter.post("/meal-plans", async (req, res) => {
  const { user_id, week_start_date, week_end_date } = req.body;
  try {
    const [mealPlan] = await knex("MealPlan")
      .insert({ user_id, week_start_date, week_end_date })
      .returning("*");
    res.json(mealPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yemek planı güncelleme (Update)
nestedRouter.put("/meal-plans/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, week_start_date, week_end_date } = req.body;
  try {
    const [mealPlan] = await knex("MealPlan")
      .where("meal_plan_id", id)
      .update({ user_id, week_start_date, week_end_date })
      .returning("*");
    res.json(mealPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yemek planı silme (Delete)
nestedRouter.delete("/meal-plans/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("MealPlan").where("meal_plan_id", id).del();
    res.json({ message: "Meal plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MealPlanRecipes CRUD işlemleri

// Yemek planı tariflerini listeleme (Read)
nestedRouter.get("/meal-plan-recipes", async (req, res) => {
  try {
    const mealPlanRecipes = await knex("MealPlanRecipes").select("*");
    res.json(mealPlanRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yeni yemek planı tarifi ekleme (Create)
nestedRouter.post("/meal-plan-recipes", async (req, res) => {
  const { meal_plan_id, recipe_id, day_of_week } = req.body;
  try {
    const [mealPlanRecipe] = await knex("MealPlanRecipes")
      .insert({ meal_plan_id, recipe_id, day_of_week })
      .returning("*");
    res.json(mealPlanRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yemek planı tarifi güncelleme (Update)
nestedRouter.put("/meal-plan-recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { meal_plan_id, recipe_id, day_of_week } = req.body;
  try {
    const [mealPlanRecipe] = await knex("MealPlanRecipes")
      .where("meal_plan_recipe_id", id)
      .update({ meal_plan_id, recipe_id, day_of_week })
      .returning("*");
    res.json(mealPlanRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yemek planı tarifi silme (Delete)
nestedRouter.delete("/meal-plan-recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("MealPlanRecipes").where("meal_plan_recipe_id", id).del();
    res.json({ message: "Meal plan recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default nestedRouter;
