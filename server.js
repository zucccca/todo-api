const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

app.get("/todos", async (req, res) => {
  const q = await pool.query("SELECT * FROM todos");
  const todos = q.rows;
  res.json({ todos });
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const q = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
  const todo = q.rows[0];

  if (!todo) {
    return res.status(404).send("Todo not found...");
  }

  res.json(todo);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required..." });
  }

  const q = await pool.query(
    "INSERT INTO todos(title) VALUES($1) RETURNING *",
    [title]
  );
  const todo = q.rows[0];

  res.status(201).json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (title && title.trim() === "") {
    return res.status(400).json({ error: "Title cannot be empty..." });
  }

  const existingTodo = await pool.query("SELECT * FROM todos WHERE id = $1", [
    id,
  ]);
  const todo = existingTodo.rows[0];

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const updatedTitle = title !== undefined ? title : todo.title;
  const updatedCompleted = completed !== undefined ? completed : todo.completed;

  const result = await pool.query(
    "UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
    [updatedTitle, updatedCompleted, id]
  );

  return res.status(200).json(result.rows[0]);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const q = await pool.query("DELETE FROM todos WHERE id = $1", [id]);

  if (q.rowCount === 0) {
    return res.status(404).send("Todo not found...");
  }

  return res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Listening on port 3000....");
});
