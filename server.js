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

const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

const taskRoutes = require('./routes/task-routes');
app.use('/api/tasks', taskRoutes);

const authRoutes = require('./routes/auth-routes.js');
app.use('/auth', authRoutes);

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

