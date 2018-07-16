const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const init = require('./passport');
const User = require('../../models/user');
const authHelpers = require('./auth-helpers');

const options = {};

init();
//not using this anymore:
passport.use(
    new LocalStrategy(options, (username, password, done) => {
        User.findByUserName(username)
        .then(user => {
            console.log('this is user inside local:', user);
            if(!user) {
                console.log('inside of !user'); 
                return done(null, false, { message: 'wrong username' });   
            }
            if(!authHelpers.comparePass(password, user.password_digest)) {
                console.log('wrong password!');
                return done(null, false, { message: 'bad password' });
            } else {
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.SESSION_KEY, {
                    expiresIn: 604800 // 1 WEEK
                });
                console.log('inside matched. this is token:', token);
                return done(null, user, token);
            }
        }).catch(err => {
            console.log("this is err:", err);
            return done(err);
        });
    })
);

module.exports = passport;
