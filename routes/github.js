const passport = require('passport');
const router = require('express').Router();
const path = require('path');

router.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}));

router.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login',
        successRedirect: '/'
    }));

router.get('/login', (req, res) => res.sendFile(path.resolve('public/authentication.html')));

module.exports = router;