const rest = require('rest');
const mime = require('rest/interceptor/mime');
const template = require('rest/interceptor/template');
const defaultRequest = require('rest/interceptor/defaultRequest');
const errorCode = require('rest/interceptor/errorCode');

const client = rest.wrap(mime)
    .wrap(template)
    .wrap(errorCode, { code: 400 })
    .wrap(defaultRequest, {
        'headers': {
            'User-Agent': 'NeverRESTing',
            'Accept': 'application/vnd.github.v3+json'
        }
    });


module.exports = {

    requestMails: (token) => {
        return client({
            'path': 'https://api.github.com/user/emails{?access_token}',
            'params': {
                'access_token': token
            }
        });
    },

    getPrimaryMail: (mails) => {
        var primaryMail = mails.find((mail) => {
            return mail.primary && mail.verified;
        });

        if (primaryMail != null) {
            return primaryMail.email;
        } else {
            return null;
        }
    },

    extractScopes: (headers) => {
        if (headers['X-Oauth-Scopes'] != null) {
            return headers['X-Oauth-Scopes'].split(', ');
        } else {
            return null;
        }
    },

    requestToken: (code) => {
        return client({
            'method': 'POST',
            'path': 'https://github.com/login/oauth/access_token',
            'entity': {
                'client_id': process.env.GITHUB_ID,
                'client_secret': process.env.GITHUB_SECRET,
                'code': code
            },
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    },

    requestScopes: (token) => {
        return client({
            'path': 'https://api.github.com/user{?access_token}',
            'params': {
                'access_token': token
            }
        });
    }

};