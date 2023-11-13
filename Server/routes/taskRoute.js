const express = require("express");
const taskController = require("../Controllers/taskController");
const router = express.Router();
    const verify= require('../middlewares/verify')


router.post("/addTask",verify.authorize, taskController.addTask);
router.get("/getAllTasks",verify.authorize, taskController.getAllTasks);
router.get("/getTaskById/:id", taskController.getTaskById);
router.put("/updateTask/:id", taskController.updateTask);
router.delete("/deleteTask/:id", taskController.deleteTask);

module.exports= router