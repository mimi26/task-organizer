const express = require('express');
const taskController = require('../controllers/task-controller');

const Router = express.Router();

Router.get('/', taskController.index);
Router.get('/:id', taskController.show);
Router.post('/', taskController.create);
Router.delete('/:id', taskController.destroy);
Router.put('/:id', taskController.update);

module.exports = Router;
