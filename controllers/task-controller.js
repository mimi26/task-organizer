const Task = require('../models/task');

const taskController = {};

taskController.index = async (req, res) => {
    try {
        const tasks = await Task.findAll(req.params.user);
        res.send(tasks);
    } catch(err) {
        console.log('this is task index error;', err);
    } 
}

taskController.show = async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.send(task);
}

taskController.create = async (req, res) => {
    const newTask = await Task.create(req.body);
    res.send(newTask);
}

taskController.destroy = async (req, res) => {
    const task = await Task.destroy(req.params.id);
    res.send(task);
}

taskController.update = async (req, res) => {
    const editedTask = await Task.update(req.body, req.params.id);
    res.send(editedTask);
}

module.exports = taskController;
