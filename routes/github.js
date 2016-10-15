const path = require('path');
const appPath = path.resolve('./app');

const githubHelper = require(appPath + '/helpers/githubHelper');
const router = require('express').Router();

router.get('/authenticate', (req, res) => {
    res.redirect('https://github.com/login/oauth/authorize?scope=user:email&client_id=' + process.env.GITHUB_ID);
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