const router = require('express').Router();

const rest = require('rest');
const mime = require('rest/interceptor/mime');
const template = require('rest/interceptor/template');
const defaultRequest = require('rest/interceptor/defaultRequest');

const client = rest.wrap(mime)
    .wrap(template)
    .wrap(defaultRequest, {
        'headers': {
            'User-Agent': 'NeverRESTing',
            'Accept': 'application/vnd.github.v3+json'
        }
    });

const path = require('path');

router.get('/authenticate', (req, res) => {
    let session = req.session;

    if (!isAuthenticated(session)) {
        sendAuthenticationPage(res);
    } else {
        let token = session.access_token;

        client({
            'path': 'https://api.github.com/user{?access_token}',
            'params': {
                'access_token': token
            }
        }).then(result => {
            const scopes = getScopes(result.headers);

            if (scopes != null && scopes.indexOf('user:email') !== -1) {

                client({
                    'path': 'https://api.github.com/user/emails{?access_token}',
                    'params': {
                        'access_token': token
                    }
                }).then(result => {
                    var primaryMail = getPrimaryMail(result.entity);
                    console.log(primaryMail);
                    res.sendFile(path.join(__dirname, 'test/authenticated.html'));
                });
            }
        }, error => {
            console.log(error);

            session.access_token = null;
            sendAuthenticationPage(res);
        });
    }
});

router.get('/github', (req, res) => {

    let session = req.session;

    client({
        'method': 'POST',
        'path': 'https://github.com/login/oauth/access_token',
        'entity': {
            'client_id': process.env.GITHUB_ID,
            'client_secret': process.env.GITHUB_SECRET,
            'code': req.query.code
        },
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        session.access_token = response.entity.access_token;
        res.redirect('../authenticate');
    });
});

const getPrimaryMail = (mails) => {
    var primaryMail = mails.find((mail) => {
        return mail.primary && mail.verified;
    });

    if (primaryMail != null) {
        return primaryMail.email;
    } else {
        return null;
    }
};

const getScopes = (headers) => {
    if (headers['X-Oauth-Scopes'] != null) {
        return headers['X-Oauth-Scopes'].split(', ');
    } else {
        return null;
    }
};

const sendAuthenticationPage = (res) => {
    res.sendFile(path.join(__dirname, 'test/index.html'));
};

const isAuthenticated = (session) => {
    return session.access_token;
};

module.exports = router;