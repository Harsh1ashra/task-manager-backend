const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); 

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

// Routes (import ONCE)
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

// Database + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
