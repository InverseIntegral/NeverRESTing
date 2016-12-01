require('dotenv').config({
    path: 'app/config/.env'
});

const path = require('path');
const logger = require('morgan');

const mongoose = require('mongoose');
const User = require('./app/models/User');

// Mongoose should use the native promise
mongoose.Promise = global.Promise;

// Express
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Passport
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser((id, done) => done(null, id));
passport.deserializeUser((id, done) => done(null, id));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: 'user:email',
}, (accessToken, refreshToken, profile, done) => {
    const id = profile.id;

    User.findOne({id})
        .exec()
        .then(data => {
            if (data == null) {
                const email = profile.emails.filter(e => e.primary)[0].value;
                const newUser = new User({id, username: profile.username, email});

                newUser.save().then(done(null, id));
            } else {
                done(null, id);
            }
        });
}));

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

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login')
};

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
