const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const init = require('./passport');
const User = require('../../models/user');
const authHelpers = require('./auth-helpers');

const options = {};

init();

passport.use(
    new LocalStrategy(options, (username, password, done) => {
        User.findByUserName(username)
        .then(user => {
            if(!user) {
                return done(null, false);
                console.log('inside of !user');    
            }
            if(!authHelpers.comparePass(password, user.password_digest)) {
                console.log('wrong password!')
                return done(null, false);
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

// passport.use(
//     new LocalStrategy(options, (username, password, done) => {
//         console.log('this is username:', username);
//         User.findByUserName(username)
//             .then(user => {
//                 if (!user) {
//                     return done(null, false);
                    
//                 }
//                 if (!authHelpers.comparePass(password, user.password_digest)) {
                    
//                     return done(null, false);
            
//                 } else {
                    
//                     return done(null, user);
//                 }
//             }).catch(err => {
               
//                 return done(err);
//             });
//     })
// );

module.exports = passport;
