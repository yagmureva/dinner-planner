import express from "express";
import knex from "../database_client.js";

const ingredientsRouter = express.Router();

// List ingredients (Read)
ingredientsRouter.get("/", async (req, res) => {
  try {
    const ingredients = await knex("Ingredients").select("*");
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new ingredient (Create)
ingredientsRouter.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const [ingredient_id] = await knex("Ingredients").insert({ name });

    const newIngredient = await knex("Ingredients")
      .where({ ingredient_id })
      .first();
    res.json(newIngredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update ingredient (Update)
ingredientsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await knex("Ingredients").where("ingredient_id", id).update({ name });

    const updatedIngredient = await knex("Ingredients")
      .where("ingredient_id", id)
      .first();
    res.json(updatedIngredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete ingredient (Delete)
ingredientsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Ingredients").where("ingredient_id", id).del();
    res.json({ message: "Ingredient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default ingredientsRouter;
