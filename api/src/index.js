import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

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

// Nested router kullanımı
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
