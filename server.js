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

app.listen(3000, () => {
  console.log("Listening on port 3000....");
});
