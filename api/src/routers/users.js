import express from "express";
import knex from "../database_client.js";

const usersRouter = express.Router();

// List users (Read)
usersRouter.get("/", async (req, res) => {
  try {
    const users = await knex("Users").select("*");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new user (Create)
usersRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [user_id] = await knex("Users").insert({ username, email, password });

    const newUser = await knex("Users").where({ user_id }).first();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user (Update)
usersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    await knex("Users")
      .where("user_id", id)
      .update({ username, email, password });

    const updatedUser = await knex("Users").where("user_id", id).first();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user (Delete)
usersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("Users").where("user_id", id).del();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default usersRouter;
