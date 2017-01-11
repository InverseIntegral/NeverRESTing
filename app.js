const path = require('path');
const express = require('express');

const expressApp = require('./app/express/configuration');
const mongoose = require('./app/mongoose');
const passport = require('./app/passport/configuration');

const todoRoute = require('./routes/todo');
const authenticationRoute = require('./routes/authentication');

expressApp.use(passport.initialize());

expressApp.use('/', authenticationRoute);
expressApp.use('/todos', passport.authenticate(), todoRoute);

expressApp.use('/build', express.static(path.join(__dirname, './public/build')));
expressApp.use('/stylesheets', express.static(path.join(__dirname, './public/stylesheets')));
expressApp.get('/*', (req,res) => res.sendfile(path.join(__dirname, './public/index.html')));

/**
 * Starts the express server and listens on the given port.
 */
const listen = () => expressApp.listen(process.env.PORT || 3000);

mongoose()
    .on('disconnected', mongoose)
    .once('open', listen);
