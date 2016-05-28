var router = require('express').Router();
var ToDo = require('../app/models/ToDo');

/* POST request that creates a new todo */
router.post('/todo', (req, res) => {
    // Destructuring the request body
    ({name} = req.body);

    // Create the new instance with the data
    const instance = new ToDo();
    instance.name = name;

    // Save the new todo
    const promise = instance.save();

    promise.then(todo => {
        res.status(201).send(todo);
    }).catch(error => {
        res.status(500).send(error);
    });
});

/* GETs all the todos */
router.get('/todos', (req, res) => {

    const promise = ToDo.find({}).exec();

    promise.then(todos => {
        res.status(200).send(todos);
    }).catch(error => {
        res.status(500).send(error);
    });

});

module.exports = router;
