var express = require('express');
var router = express.Router();
var ToDo = require('../modules/ToDo');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/neverresting');

/* POST request that creates a new todo */
router.post('/todo', (req, res) => {
    // Destructuring the request body
    ({name} = req.body);

    // Create the new instance with the data
    var instance = new ToDo();
    instance.name = name;

    // Save the new todo
    instance.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(201).send(instance);
        }
    });
});

/* GETs all the todos */
router.get('/todos', (req, res) => {
    ToDo.find({}, (err, todos) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(todos);
        }
    });
});

module.exports = router;
