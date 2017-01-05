const mongoose = require('mongoose');

// Mongoose should use the native promise
mongoose.Promise = global.Promise;

/**
 * Connects to the mongodb with the given configuration parameters.
 * @returns the mongoose connection
 */
const connect = () => {
    const options = {
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

module.exports =  connect;
