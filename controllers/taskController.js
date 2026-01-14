const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const task = await Task.create({
      title,
      status: status || "incomplete"
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// READ
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    if (req.body.title !== undefined && req.body.title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, status: req.body.status },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
