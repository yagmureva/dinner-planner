import express from "express";
import knex from "../database_client.js";

const mealPlansRouter = express.Router();

// List meal plans (Read)
mealPlansRouter.get("/", async (req, res) => {
  try {
    const mealPlans = await knex("MealPlan").select("*");
    res.json(mealPlans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new meal plan (Create)
mealPlansRouter.post("/", async (req, res) => {
  const { user_id, week_start_date, week_end_date } = req.body;
  try {
    const [meal_plan_id] = await knex("MealPlan").insert({
      user_id,
      week_start_date,
      week_end_date,
    });

    const newMealPlan = await knex("MealPlan").where({ meal_plan_id }).first();
    res.json(newMealPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update meal plan (Update)
mealPlansRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, week_start_date, week_end_date } = req.body;
  try {
    await knex("MealPlan")
      .where("meal_plan_id", id)
      .update({ user_id, week_start_date, week_end_date });

    const updatedMealPlan = await knex("MealPlan")
      .where("meal_plan_id", id)
      .first();
    res.json(updatedMealPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete meal plan (Delete)
mealPlansRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("MealPlan").where("meal_plan_id", id).del();
    res.json({ message: "Meal plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default mealPlansRouter;
