// controllers/tasksController.js
const Task = require("../models/task");

exports.addTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      priority,
      user:req.user.id
    });
    const savedTask = await newTask.save();
    res.status(201).json({message:"Task added successfully",savedTask});
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getAllTasks = async (req, res) => { 
    // The user _id is available from the decoded JWT token
    const user_id = req.user.id;
    console.log(user_id)
    // const user_id = "6552236c893e331853087a03"
    
    // Use req.user._id instead of req.user.user_id
  
    try {
        const tasks = await Task.find({ user: user_id , is_deleted: false}); // Switch the order of conditions
  
      res.status(200).json(tasks);
      console.log(tasks)
    } catch (error) {
      console.error("Failed to get tasks:", error);
      res.status(500).json({ error: "Failed to get tasks" });
    }
  }

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(
            req.params.id
            // user: req.user.id, // Ensure that the user ID is also considered
            // is_deleted: false,
        );
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, status, priority },
      { new: true } // Return the modified document
    );

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(updatedTask);
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true }
        );

        if (!deletedTask) {
            res.status(404).json({ error: "Task not found" });
        } else {
            res.json(deletedTask);
        }
    } catch (error) {
    console.error("Error soft deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



