const path = require('path');
const appPath = path.resolve('./app');

const githubHelper = require(appPath + '/helpers/githubHelper');
const router = require('express').Router();

router.get('/authentication', (req, res) => {
    res.sendFile(path.resolve('public/authentication.html'));
});

router.get('/github', (req, res) => {
    let session = req.session;

    githubHelper.requestToken(req.query.code)
        .then((response) => {
            session.access_token = response.entity.access_token;
            res.redirect('/');
        });
});

module.exports = router;