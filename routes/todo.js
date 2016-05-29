const router = require('express').Router();
const ToDo = require('../app/models/ToDo');

/**
 * Handles a mongoose promise by using the ResponseHandler
 * abstraction to return a response.
 *
 * @param promise   The mongoose promise for this operation.
 * @param response  The express js response object.
 */
const handlePromise = (promise, response) => {
    let ResponseHandler = require('../app/responseHandler');
    const handler = new ResponseHandler(response);

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
router.post('/todo', (req, res) => {
    // Destructuring the request body
    const {name} = req.body;

    if (!validate(name)) {
        res.status(400).json('Invalid request');
        return;
    }

    // Create the new instance with the data
    const instance = new ToDo();
    instance.name = name;

    // Save the new todo
    const promise = instance.save();
    handlePromise(promise, res);
});

/* GETs all the todos */
router.get('/todos', (req, res) => {
    const promise = ToDo.find({}).exec();
    handlePromise(promise, res);
});

/* GETs a specific todo by its id */
router.get('/todo/:id', (req, res) => {
    const promise = ToDo.findOne({_id: req.params.id}).exec();
    handlePromise(promise, res);
});

module.exports = router;