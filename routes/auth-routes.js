const express = require('express');
const Router = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

Router.post('/register, usersController.create');
Router.post('/login', passport.authenticate('local', {
    failureFlash: true
}));
Router.get('/logout', (req, res) => {
    req.logout();
    console.log("this is req.logout():", req.logout())
});

module.exports = Router;