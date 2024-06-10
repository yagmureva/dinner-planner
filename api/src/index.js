import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import usersRouter from "./routers/users.js";
import recipesRouter from "./routers/recipes.js";
import ingredientsRouter from "./routers/ingredients.js";
import mealPlansRouter from "./routers/mealPlans.js";
import recipeIngredientsRouter from "./routers/recipeIngredients.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// Veritabanı tablolarını gösteren rota
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  try {
    const tables = await knex.raw(SHOW_TABLES_QUERY);
    res.json({ tables });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sub-routers
apiRouter.use("/users", usersRouter);
apiRouter.use("/recipes", recipesRouter);
apiRouter.use("/ingredients", ingredientsRouter);
apiRouter.use("/meal-plans", mealPlansRouter);
apiRouter.use("/recipe-ingredients", recipeIngredientsRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
