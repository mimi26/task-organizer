const Task = require('../models/task');

const taskController = {};

taskController.index = async (req, res) => {
    const tasks = await Task.findAll();
    res.send(tasks);
}

taskController.show = async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.send(task);
}

taskController.create = async (req, res) => {
    const newTask = await Task.create(req.body);
    res.send(newTask);
}

module.exports = taskController;
