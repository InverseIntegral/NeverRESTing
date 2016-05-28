var router = require('express').Router();
var ToDo = require('../app/models/ToDo');
var ResponseHandler = require('../app/responseHandler');

/* POST request that creates a new todo */
router.post('/todo', (req, res) => {
    // Destructuring the request body
    const {name} = req.body;

    // Create the new instance with the data
    const instance = new ToDo();
    instance.name = name;

    // Save the new todo
    const promise = instance.save();
    const handler = new ResponseHandler(res);

    promise.then(data => handler.handleSuccess(data))
        .catch(error => handler.handleFailure(error));
});

/* GETs all the todos */
router.get('/todos', (req, res) => {

    const promise = ToDo.find({}).exec();
    const handler = new ResponseHandler(res);

    promise.then(data => handler.handleSuccess(data))
        .catch(error => handler.handleFailure(error));

});

module.exports = router;
