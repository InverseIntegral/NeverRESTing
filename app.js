require('dotenv').config({
    path: 'app/config/.env'
});

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

// Mongoose should use the native promise
mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;
const app = express();

/* Custom routers */
const todoRoutes = require('./routes/todo');
const githubRoutes = require('./routes/github');
const mainRoutes = require('./routes/main');

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'NeverResting',
    resave: false,
    saveUninitialized: false
}));

app.use('/',
    githubRoutes,
    mainRoutes,
    express.static(path.join(__dirname, 'public')));

app.use('/todos', todoRoutes);

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

    return mongoose.connect('mongodb://' + process.env.MONGODB_HOST + ":" + process.env.MONGODB_PORT +  '/' + process.env.MONGODB_DATABASE, options).connection;
};

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

module.exports = app;
