const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    const _id = jwt_payload.id;

    User.findOne({_id}, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (jwt_payload.expires < Date.now()) {
            done(null, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

module.exports = {

    initialize: () => {
        return passport.initialize();
    },

    authenticate: () => {
        return passport.authenticate('jwt', {session: false});
    }

};