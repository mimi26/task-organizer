const express = require('express');
const Router = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

Router.post('/register', usersController.create);

Router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({
        token: req.authInfo,
        userData: req.user
    });
});

Router.post('/logout', (req, res) => {
    req.logout();
    res.send('logged out');
});

module.exports = Router;


