const path = require('path');
const appPath = path.resolve('./app');

const ToDo = require(appPath + '/models/ToDo');
const User = require(appPath + '/models/User');

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
const handlePromise = (promise, response, handlerClass, dataProperty) => {
    const handler = new handlerClass(response);

    promise
        .then(data => handler.handleSuccess(data[dataProperty]))
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
router.post('/', (req, res) => {
    const {text} = req.body;

    if (!validate(text)) {
        res.status(400).json({
            'message': 'Not enough parameters supplied'
        });

        return;
    }

    const promise = User.findOneAndUpdate({
        _id: req.user.id
    }, {
        $push: {
            todos: {
                text
            }
        }
    }, {
        new: true
    }).exec();

    handlePromise(promise, res, DefaultResponseHandler, 'todos');
});

/* GETs all the todos */
router.get('/', (req, res) => {
    User.findOne({'_id': req.user.id}).exec()
        .then(data => {
            const handler = new DefaultResponseHandler(res);
            handler.handleSuccess(data.todos);
        });
});

/* Toggles a todo */
router.post('/:id/toggle', (req, res) => {
    User.findOne({
        _id: req.user.id,
    }, {
        todos: {
            $elemMatch: {
                _id: req.params.id
            }
        }
    }).exec().then(data => {
        let toggledState = !data.todos[0].active;

        const promise = User.findOneAndUpdate({
            _id: req.user.id,
            'todos._id': req.params.id
        }, {
            $set: {
                'todos.$.active': toggledState
            }
        }, {
            new: true
        }).exec();

        handlePromise(promise, res, DefaultResponseHandler, 'todos');
    });

});

module.exports = router;