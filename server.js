const express = require("express");
const app = express();

const todos = [
  { id: 1, title: "cook", completed: false },
  { id: 2, title: "vacuum", completed: false },
  { id: 3, title: "laundry", completed: false },
];

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

app.listen(3000, () => {
  console.log("Listening on port 3000....");
});
