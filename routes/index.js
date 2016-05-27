var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
mongoose.connect('mongodb://localhost/neverresting');

var ToDo = require('../modules/ToDo');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

router.get('/todo', (req, res, next) => {
    var instance = new ToDo();
    instance.name = 'A name';

    instance.save((err) => {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            res.json("todo created");
        }

        res.end();
    });
});

router.get('/todos', (req, res, next) => {
    ToDo.find({}, (err, todos) => {
        res.json(todos);
        res.end();
    });
});

module.exports = router;
