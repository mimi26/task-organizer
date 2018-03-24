const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.create = (req, res) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password_digest, salt);
    console.log("this is req.body:", req.body)
    User.createUser({
        username: req.body.username,
        email: req.body.email,
        password_digest: hash
    }).then(user => {
        req.login(user, (err) => {
            if (err) return next(err);
        })
    }).catch(error => {
        console.log(err);
        res.status(500).json({ error });
    });
}



module.exports = usersController;