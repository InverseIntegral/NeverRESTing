const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

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

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login')
};

module.exports = {passport, ensureAuthenticated};