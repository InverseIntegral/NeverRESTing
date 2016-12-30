const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const options = {
    secretOrKey: 'abc',
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    const _id = jwt_payload._id;

    User.findOne({_id}, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

module.exports = passport;