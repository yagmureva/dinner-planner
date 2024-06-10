import express from "express";
import knex from "../database_client.js";

const recipesRouter = express.Router();

// List recipes (Read)
recipesRouter.get("/", async (req, res) => {
  try {
    const recipes = await knex("Recipes").select("*");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new recipe (Create)
recipesRouter.post("/", async (req, res) => {
  const { name, description, prep_time, cook_time, user_id } = req.body;
  if (!name || !description || !prep_time || !cook_time || !user_id) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const [recipe_id] = await knex("Recipes").insert({
      name,
      description,
      prep_time,
      cook_time,
      user_id,
    });

    const newRecipe = await knex("Recipes").where({ recipe_id }).first();
    res.json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update recipe (Update)
recipesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, prep_time, cook_time, user_id } = req.body;
  try {
    await knex("Recipes")
      .where("recipe_id", id)
      .update({ name, description, prep_time, cook_time, user_id });

    const updatedRecipe = await knex("Recipes").where("recipe_id", id).first();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete recipe (Delete)
recipesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Recipes").where("recipe_id", id).del();
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default recipesRouter;
