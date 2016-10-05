const router = require('express').Router();
const ToDo = require('../app/models/ToDo');

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
    // Destructuring the request body
    const {text} = req.body;

    if (!validate(text)) {
        res.status(400).json('Invalid request');
        return;
    }

    // Create the new instance with the data
    const instance = new ToDo();
    instance.text = text;

    // Save the new todo
    const promise = instance.save();
    handlePromise(promise, res, DefaultResponseHandler);
});

/* GETs all the todos */
router.get('/todos', (req, res) => {
    const promise = ToDo.find({}).exec();
    handlePromise(promise, res, DefaultResponseHandler);
});

/* GETs a specific todo by its id */
router.get('/todos/:id', (req, res) => {
    const promise = ToDo.findOne({_id: req.params.id}).exec();
    handlePromise(promise, res, DefaultResponseHandler);
});

router.delete('/todos/:id', (req, res) => {
    const promise = ToDo.findOne({_id: req.params.id}).remove().exec();
    handlePromise(promise, res, NoContentResponseHandler);
});

module.exports = router;