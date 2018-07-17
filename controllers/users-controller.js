const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const usersController = {};

usersController.create = (req, res) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password_digest, salt);
    User.findByUserName(req.body.username).then(username => {
        if (!username) {
            User.findByEmail(req.body.email).then(email => {
                if (!email) {
                    User.createUser({
                        username: req.body.username,
                        email: req.body.email,
                        password_digest: hash
                    }).then(user => {
                        res.send(user);
                    }).catch(error => {
                        res.send(error);
                    });
                } else {
                    res.status(409).send('This email is already registered.');
                }
            });
        } else {
            res.status(409).send('This username has already been taken. Please choose another.')
        }
    });
}

usersController.login = (req, res) => {
    User.findByUserName(req.body.username).then(user => {
        if (!user) {
            res.send('please enter valid username');
        } else {
            bcrypt.compare(req.body.password, user.password_digest, (err, response) => {
                if(response) {
                    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SESSION_KEY, {
                        expiresIn: 604800 // 1 WEEK
                    });
                    res.send({ token, user });
                } else {
                    res.send('Incorrect username/password combination');
                }
            });
        }
    });    
}



module.exports = usersController;