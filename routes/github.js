const router = require('express').Router();
const rest = require('rest');
const mime = require('rest/interceptor/mime');
const template = require('rest/interceptor/template');

const client = rest.wrap(mime).wrap(template);

router.get('/github', (req, res) => {
    client({
        'method': 'POST',
        'path': 'https://github.com/login/oauth/access_token',
        'headers': {
            'Content-Type': 'application/json'
        },
        'entity': {
            'client_id': 'f33f36e205375acb0335',
            'client_secret': 'The secret is a lie',
            'code': req.query.code
        }
    }).then((response) => {
        if (response.entity.scope.indexOf('user:email') !== -1) {

            client({
                'path': 'https://api.github.com/user/emails{?access_token}',
                'params': {
                    'access_token': response.entity.access_token
                },
                'headers': {
                    'User-Agent': 'NeverRESTing',
                    'Accept': 'application/vnd.github.v3+json'
                }
            }).then(result => {
                var mails = result.entity;
                var primaryMail = mails.find((mail) => {
                    return mail.primary && mail.verified;
                });

                if (primaryMail != null) {
                    console.log(primaryMail.email);
                }
            });


        }
    });


});

module.exports = router;