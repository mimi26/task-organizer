const express = require('express');
const Router = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');


// Router.get('/login', authHelpers.loginRedirect, (req, res) => {
//    console.log("inside login get");
// });
Router.post('/register', usersController.create);
// Router.post('/login', (req, res) => {
//     console.log('this is req.body:', req.body);
// })
Router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({
        token: req.authInfo,
        userData: req.user
    });
});


Router.get('/logout', (req, res) => {
    req.logout();
    console.log("this is req.logout():", req.logout())
});

module.exports = Router;


