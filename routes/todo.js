const path = require('path');
const appPath = path.resolve('./app');

const ToDo = require(appPath + '/models/ToDo');
const User = require(appPath + '/models/User');
const githubHelper = require(appPath + '/helpers/githubHelper');

const router = require('express').Router();
const DefaultResponseHandler = require('../app/handlers/DefaultResponseHandler');
const NoContentResponseHandler = require('../app/handlers/NoContentResponseHandler');

/**
 * Handles a mongoose promise by using the ResponseHandler
 * abstraction to return a response.
 *
 * @param promise       The mongoose promise for this operation.
 * @param response      The express js response object.
 * @param handlerClass  The class that knows how to handle the supplied promise.
 */
const handlePromise = (promise, response, handlerClass) => {
    const handler = new handlerClass(response);

    promise
        .then(data => handler.handleSuccess(data))
        .catch(error => handler.handleFailure(error));
};

/**
 * Simple validation (undefined and null check) of all
 * supplied parameters.
 *
 * @param check         The values that should be checked.
 * @returns {boolean}   Returns false if any value is not defined or null.
 *                      And returns true if all of them are defined and not null.
 */
const validate = (...check) => {
    for (let value of check) {
        if (value == null) {
            return false;
        }
    }

    return true;
};

/* POST request that creates a new todo */
router.post('/todos', (req, res) => {

    getMail(req.session)
        .then(mail => {

            // Destructuring the request body
            const {text} = req.body;

            if (!validate(text)) {
                res.status(400).json({
                    'message': 'Not enough parameters supplied'
                });

                return;
            }

            const promise = User.findOneAndUpdate({
                mail: mail
            }, {
                $push: {
                    todos: {
                        text
                    }
                }
            }, {
                new: true
            }).exec();

            handlePromise(promise, res, DefaultResponseHandler);
        }, () => {
            res.sendStatus(401).end();
        });
});

/* GETs all the todos */
router.get('/todos', (req, res) => {

    getMail(req.session)
        .then(mail => {

            User.findOne({'mail': mail}).exec()
                .then(data => {

                    if (data == null) {
                        const instance = new User();
                        instance.mail = mail;

                        const promise = instance.save();
                        handlePromise(promise, res, DefaultResponseHandler);
                    } else {
                        const handler = new DefaultResponseHandler(res);
                        handler.handleSuccess(data);
                    }
                });
        }, () => {
            res.sendStatus(401).end();
        });
});

/* Toggles a todo */
router.post('/todos/:id/toggle', (req, res) => {

    getMail(req.session)
        .then(mail => {

            User.findOne({
                mail: mail,
            }, {
                todos: {
                    $elemMatch: {
                        _id: req.params.id
                    }
                }
            }).exec().then(data => {
                let toggledState = !data.todos[0].active;

                const promise = User.findOneAndUpdate({
                    mail: mail,
                    'todos._id': req.params.id
                }, {
                    $set: {
                        'todos.$.active': toggledState
                    }
                }, {
                    new: true
                }).exec();

                handlePromise(promise, res, DefaultResponseHandler);
            });

        }, () => {
            res.sendStatus(401).end();
        });

});

const getMail = (session) => {
    return new Promise((resolve, reject) => {
        let token = session.access_token;

        if (token == null) {
            reject();
        }

        githubHelper.requestScopes(token)
            .then(result => {
                const scopes = githubHelper.extractScopes(result.headers);

                if (scopes != null && scopes.indexOf('user:email') !== -1) {
                    githubHelper.requestMails(token)
                        .then(result => {
                            resolve(githubHelper.getPrimaryMail(result.entity));
                        }, () => {
                            reject();
                        });
                }
            }, () => {
                session.access_token = null;
                reject();
            });
    });
};

module.exports = router;