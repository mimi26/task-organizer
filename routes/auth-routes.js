const express = require('express');
const Router = express.Router();
const usersController = require('../controllers/users-controller');

Router.post('/register', usersController.create);

Router.post('/login', usersController.login);

Router.post('/logout', (req, res) => {
    req.logout();
    res.send('logged out');
});

module.exports = Router;


