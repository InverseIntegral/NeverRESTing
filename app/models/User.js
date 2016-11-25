/**
 * Created by Inverse Integral on 15.10.2016.
 */
const mongoose = require('mongoose');
const ToDo = require('./ToDo');
const Schema = mongoose.Schema;

const User = new Schema({
    id: {type: String},
    todos: [ToDo]
});

module.exports = mongoose.model('User', User);