const express = require('./app/express');
const mongoose = require('./app/mongoose');
/**
 * Starts the express server and listens on the given port.
 */
const listen = () => {
    express.listen(process.env.PORT || 3000);
};

mongoose()
    .on('disconnected', mongoose)
    .once('open', listen);
