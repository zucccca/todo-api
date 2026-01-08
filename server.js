const express = require("express");
const app = express();

const todos = [
  { id: 0, title: "cook", completed: false },
  { id: 1, title: "vacuum", completed: false },
  { id: 2, title: "laundry", completed: false },
];

let nextId = Math.max(...todos.map((todo) => todo.id)) + 1;

app.use(express.json());

app.get("/todos", (req, res) => {
  res.json({ todos });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) {
    return res.status(404).send("Todo not found...");
  }
  res.json({ todo });
});

app.post("/todos", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = { id: nextId++, title, completed: false };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.listen(3000, () => {
  console.log("Listening on port 3000....");
});
