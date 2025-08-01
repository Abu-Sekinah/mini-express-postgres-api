const express = require("express");
const router = express.Router();
const pool = require("../db");

// Helper: validate user data
function validateUser(data) {
  const { name, email, age } = data;
  if (!name || typeof name !== "string") return "Name is required and must be a string.";
  if (!email || typeof email !== "string") return "Email is required and must be a string.";
  if (!age || typeof age !== "number") return "Age is required and must be a number.";
  return null;
}

// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
});

// POST create new user
router.post("/", async (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  const { name, email, age } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database Error: " + err.message });
  }
});

// PUT update user
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  const { name, email, age } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
      [name, email, age, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database Error: " + err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database Error: " + err.message });
  }
});

module.exports = router;
