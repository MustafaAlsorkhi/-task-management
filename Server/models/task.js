const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   dueDate: Date,
//   status: String,
//   priority: String,
//   is_deleted: { type: Boolean, default: false },
// });

// const Task = mongoose.model("Task", taskSchema);

// module.exports = Task;const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Pending','Medium', 'Completed'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'medium',
    },
    is_deleted: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });
  
  const Task = mongoose.model('Task', taskSchema);
  
  module.exports = Task;
  