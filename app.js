const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();

/* Custom routers */
const todoRoutes = require('./routes/todo');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', todoRoutes);

/**
 * Starts the express server and listens on the given port.
 */
const listen = () => {
    app.listen(port);
    console.log('Express app started on port ' + port);
};

/**
 * Connects to the mongod with the given configuration parameters.
 * @returns {MongooseThenable} a monngoose abstraction
 */
const connect = () => {
    var options = {server: {socketOptions: {keepAlive: 1}}};
    return mongoose.connect('mongodb://localhost/neverresting', options).connection;
};

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

module.exports = app;
