const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);

let tasks = [];

// Routes
app.get("/tasks", (req, res) => { 
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = { _id: Date.now().toString(), title: req.body.title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((task) => task._id !== req.params.id);
  res.json({ message: "Task deleted successfully" });
});

module.exports = app;
