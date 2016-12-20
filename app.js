const path = require('path');
const express = require('express');

const expressApp = require('./app/express/configuration');
const mongoose = require('./app/mongoose');
const {passport, ensureAuthenticated} = require('./app/passport/configuration');

const todoRoute = require('./routes/todo');
const githubRoute = require('./routes/github');

expressApp.use(passport.initialize());
expressApp.use(passport.session());

expressApp.all(['/', '/index.html'], ensureAuthenticated);
expressApp.use('/', githubRoute, express.static(path.join(__dirname, './public')));
expressApp.use('/todos', ensureAuthenticated, todoRoute);

/**
 * Starts the express server and listens on the given port.
 */
const listen = () => expressApp.listen(process.env.PORT || 3000);

mongoose()
    .on('disconnected', mongoose)
    .once('open', listen);
