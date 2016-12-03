require('dotenv').config({
    path: 'app/config/.env'
});

const path = require('path');
const logger = require('morgan');

const {passport, ensureAuthenticated} = require('./passport/configuration');

// Express
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('common'));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'NeverResting',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

const todoRoute = require('../routes/todo');
const githubRoute = require('../routes/github');

app.all(['/', '/index.html'], ensureAuthenticated);

app.use('/', githubRoute, express.static(path.join(__dirname, '../public')));
app.use('/todos', ensureAuthenticated, todoRoute);

module.exports = app;
