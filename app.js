require('dotenv').config({
    path: 'app/config/.env'
});

const path = require('path');
const logger = require('morgan');

const mongoose = require('mongoose');

const {passport, ensureAuthenticated} = require('./app/passport/configuration');

// Mongoose should use the native promise
mongoose.Promise = global.Promise;

// Express
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
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

const todoRoute = require('./routes/todo');
const githubRoute = require('./routes/github');

app.all(['/', '/index.html'], ensureAuthenticated);

app.use('/', githubRoute, express.static(path.join(__dirname, 'public')));
app.use('/todos', ensureAuthenticated, todoRoute);

/**
 * Starts the express server and listens on the given port.
 */
const listen = () => {
    app.listen(port);
    console.log('Express app started on port ' + port);
};

/**
 * Connects to the mongodb with the given configuration parameters.
 * @returns the mongoose connection
 */
const connect = () => {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1 // Keep the connection alive
            }
        },
        user: process.env.MONGODB_USERNAME,
        pass: process.env.MONGODB_PASSWORD
    };

    return mongoose.connect('mongodb://' + process.env.MONGODB_HOST + ":" + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DATABASE, options).connection;
};

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

module.exports = app;
