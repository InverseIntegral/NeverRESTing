const path = require('path');
const appPath = path.resolve('./app');

const githubHelper = require(appPath + '/helpers/githubHelper');
const router = require('express').Router();

router.get('/authenticate', (req, res) => {
    let session = req.session;

    if (!isAuthenticated(session)) {
        sendAuthenticationPage(res);
    } else {
        let token = session.access_token;

        githubHelper.requestScopes(token)
            .then(result => {
                const scopes = githubHelper.extractScopes(result.headers);

                if (scopes != null && scopes.indexOf('user:email') !== -1) {
                    res.redirect('/');
                } else {
                    sendAuthenticationPage(res);
                }

            }, error => {
                session.access_token = null;
                sendAuthenticationPage(res);
            });
    }
});

router.get('/github', (req, res) => {
    let session = req.session;

    githubHelper.requestToken(req.query.code)
        .then((response) => {
            session.access_token = response.entity.access_token;
            res.redirect('../authenticate');
        });
});

const sendAuthenticationPage = (res) => {
    res.redirect('https://github.com/login/oauth/authorize?scope=user:email&client_id=' + process.env.GITHUB_ID);
};

const isAuthenticated = (session) => {
    return session.access_token;
};

module.exports = router;