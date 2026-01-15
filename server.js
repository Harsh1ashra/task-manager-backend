

// if (process.env.NODE_ENV !== "test") {
//   mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error(err));

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }




// const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI not defined");
//     }

//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1);
//   }
// };

// if (process.env.NODE_ENV !== "test") {
//   connectDB();
// }

// module.exports = app;







const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");




p.use(express.json());
app.use("/tasks", taskRoutes);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));






const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    
    const taskRoutes = require("./routes/tasks");
    app.use("/tasks", taskRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
