import express from "express";
import knex from "../database_client.js";

const recipeIngredientsRouter = express.Router();

// List recipe ingredients (Read)
recipeIngredientsRouter.get("/", async (req, res) => {
  try {
    const recipeIngredients = await knex("RecipeIngredients").select("*");
    res.json(recipeIngredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new recipe ingredient (Create)
recipeIngredientsRouter.post("/", async (req, res) => {
  const { recipe_id, ingredient_id, quantity, measurement_unit } = req.body;
  try {
    const [recipe_ingredient_id] = await knex("RecipeIngredients").insert({
      recipe_id,
      ingredient_id,
      quantity,
      measurement_unit,
    });

    const newRecipeIngredient = await knex("RecipeIngredients")
      .where({ recipe_ingredient_id })
      .first();
    res.json(newRecipeIngredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update recipe ingredient (Update)
recipeIngredientsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { recipe_id, ingredient_id, quantity, measurement_unit } = req.body;
  try {
    await knex("RecipeIngredients")
      .where("recipe_ingredient_id", id)
      .update({ recipe_id, ingredient_id, quantity, measurement_unit });

    const updatedRecipeIngredient = await knex("RecipeIngredients")
      .where("recipe_ingredient_id", id)
      .first();
    res.json(updatedRecipeIngredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete recipe ingredient (Delete)
recipeIngredientsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("RecipeIngredients").where("recipe_ingredient_id", id).del();
    res.json({ message: "Recipe ingredient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default recipeIngredientsRouter;
