const express = require('express');
const taskController = require('../controllers/task-controller');

const Router = express.Router();

Router.get('/', taskController.index);

Router.get('/:id', taskController.show);

Router.post('/', taskController.create);

Router.delete('/:id', taskController.destroy);

module.exports = Router;


// moviesRouter.get('/', moviesController.index)

// moviesRouter.get('/new', moviesController.new)

// moviesRouter.get('/:id', moviesController.show)

// moviesRouter.get('/:id/edit', moviesController.edit)

// moviesRouter.put('/:id', moviesController.update)

// moviesRouter.post('/', moviesController.create)

// moviesRouter.delete('/:id', moviesController.destroy)