import express from "express";
import knex from "../database_client.js";

const nestedRouter = express.Router();

// Users CRUD operations

// List users (Read)
nestedRouter.get("/users", async (req, res) => {
  try {
    const users = await knex("Users").select("*");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add new user (Create)
nestedRouter.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [user] = await knex("Users")
      .insert({ username, email, password })
      .returning("*");
    res.json(user);
  } catch (err) {
    console.error("Error adding user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update user (Update)
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
    console.error("Error updating user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete user (Delete)
nestedRouter.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Users").where("user_id", id).del();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Recipes CRUD operations

// List recipes (Read)
nestedRouter.get("/recipes", async (req, res) => {
  try {
    const recipes = await knex("Recipes").select("*");
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching recipes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add new recipe (Create)
nestedRouter.post("/recipes", async (req, res) => {
  const { name, description, prep_time, cook_time, user_id } = req.body;
  if (!name || !description || !prep_time || !cook_time || !user_id) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const [recipe] = await knex("Recipes")
      .insert({ name, description, prep_time, cook_time, user_id })
      .returning("*");
    res.json(recipe);
  } catch (err) {
    console.error("Error adding recipe:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update recipe (Update)
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
    console.error("Error updating recipe:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete recipe (Delete)
nestedRouter.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Recipes").where("recipe_id", id).del();
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Ingredients CRUD operations

// List ingredients (Read)
nestedRouter.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await knex("Ingredients").select("*");
    res.json(ingredients);
  } catch (err) {
    console.error("Error fetching ingredients:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add new ingredient (Create)
nestedRouter.post("/ingredients", async (req, res) => {
  const { name } = req.body;
  try {
    const [ingredient] = await knex("Ingredients")
      .insert({ name })
      .returning("*");
    res.json(ingredient);
  } catch (err) {
    console.error("Error adding ingredient:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update ingredient (Update)
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
    console.error("Error updating ingredient:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete ingredient (Delete)
nestedRouter.delete("/ingredients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Ingredients").where("ingredient_id", id).del();
    res.json({ message: "Ingredient deleted successfully" });
  } catch (err) {
    console.error("Error deleting ingredient:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// RecipeIngredients CRUD operations

// List recipe ingredients (Read)
nestedRouter.get("/recipe-ingredients", async (req, res) => {
  try {
    const recipeIngredients = await knex("RecipeIngredients").select("*");
    res.json(recipeIngredients);
  } catch (err) {
    console.error("Error fetching recipe ingredients:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add new recipe ingredient (Create)
nestedRouter.post("/recipe-ingredients", async (req, res) => {
  const { recipe_id, ingredient_id, quantity, measurement_unit } = req.body;
  try {
    const [recipeIngredient] = await knex("RecipeIngredients")
      .insert({ recipe_id, ingredient_id, quantity, measurement_unit })
      .returning("*");
    res.json(recipeIngredient);
  } catch (err) {
    console.error("Error adding recipe ingredient:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update recipe ingredient (Update)
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
    console.error("Error updating recipe ingredient:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete recipe ingredient (Delete)
nestedRouter.delete("/recipe-ingredients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("RecipeIngredients").where("recipe_ingredient_id", id).del();
    res.json({ message: "Recipe ingredient deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe ingredient:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// MealPlan CRUD operations

// List meal plans (Read)
nestedRouter.get("/meal-plans", async (req, res) => {
  try {
    const mealPlans = await knex("MealPlan").select("*");
    res.json(mealPlans);
  } catch (err) {
    console.error("Error fetching meal plans:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add new meal plan (Create)
nestedRouter.post("/meal-plans", async (req, res) => {
  const { user_id, week_start_date, week_end_date } = req.body;
  try {
    const [mealPlan] = await knex("MealPlan")
      .insert({ user_id, week_start_date, week_end_date })
      .returning("*");
    res.json(mealPlan);
  } catch (err) {
    console.error("Error adding meal plan:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update meal plan (Update)
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
    console.error("Error updating meal plan:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete meal plan (Delete)
nestedRouter.delete("/meal-plans/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("MealPlan").where("meal_plan_id", id).del();
    res.json({ message: "Meal plan deleted successfully" });
  } catch (err) {
    console.error("Error deleting meal plan:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default nestedRouter;
