require('dotenv').config({
    path: 'app/config/.env'
});

const path = require('path');
const appPath = path.resolve('./app');

const logger = require('morgan');

// Express
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// Passport
const passport = require('passport');
const GitHubStrategy = require('passport-github2');

const mongoose = require('mongoose');
const User = require(appPath + '/models/User');

// Mongoose should use the native promise
mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;
const app = express();

/* Custom routers */
const todoRoutes = require('./routes/todo');
const githubRoutes = require('./routes/github');

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('common'));
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({'id': profile.id})
            .exec()
            .then(data => {
                if (data == null) {
                    const instance = new User();
                    instance.id = profile.id;

                    instance.save().then(data => done(null, data));
                } else {
                    done(null, data);
                }
            });
    }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'NeverResting',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login')
};

app.use('/',
    githubRoutes,
    ensureAuthenticated,
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

    return mongoose.connect('mongodb://' + process.env.MONGODB_HOST + ":" + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DATABASE, options).connection;
};

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

module.exports = app;
