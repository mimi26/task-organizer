const express = require('express');
const logger = require('morgan');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.SESSION_KEY));

// const session = require('express-session');
// app.use(session({
//     secret: process.env.SESSION_KEY,
//     resave: false,
//     saveUninitialized: true
// }));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const taskRoutes = require('./routes/task-routes');
app.use('/api/tasks', taskRoutes);

app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: err,
        message: err.message,
    });
});

