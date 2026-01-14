// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ["incomplete", "inprogress", "complete"],
//     default: "incomplete"
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Task", taskSchema);





const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["incomplete", "inprogress", "complete"],
    default: "incomplete"
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
