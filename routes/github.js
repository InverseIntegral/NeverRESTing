const path = require('path');
const appPath = path.resolve('./app');

const githubHelper = require(appPath + '/helpers/githubHelper');
const router = require('express').Router();

router.get('/authentication', (req, res) => {
    res.sendFile(path.resolve('public/authentication.html'));
});

router.get('/github', (req, res) => {
    const session = req.session;
    const code = req.query.code;

    if (code == null) {
        res.sendStatus(400).end();
    }

    githubHelper.requestToken(code)
        .then(response => {
            const token = response.entity.access_token;

            if (token !== null) {
                session.access_token = token;
                res.redirect('/');
            } else {
                res.sendStatus(400).end();
            }
        });
});

module.exports = router;