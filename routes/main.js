const path = require('path');
const appPath = path.resolve('./app');

const githubHelper = require(appPath + '/helpers/githubHelper');
const router = require('express').Router();

const checkSession = (req, res, next) => {
    const session = req.session;
    let token = session.access_token;

    if (token == null) {
        res.redirect('/authentication');
    }

    githubHelper.requestScopes(token)
        .then(result => {
            const scopes = githubHelper.extractScopes(result.headers);

            if (scopes != null && scopes.indexOf('user:email') !== -1) {
                githubHelper.requestMails(token)
                    .then(result => {
                        session.mail = githubHelper.getPrimaryMail(result.entity);
                        next();
                    }, () => {
                        res.redirect('/authentication');
                    });
            }
        }, () => {
            session.access_token = null;
            res.redirect('/authentication');
        });
};

router.all(['/', '/index.html', '/todos', '/todos/*'], checkSession);

module.exports = router;