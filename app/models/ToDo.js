/**
 * Created by Inverse Integral on 26.05.2016.
 */
const ToDoStates = require('./ToDoStates');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Defines the database schema of this entity */
const ToDo = new Schema({
    name: {type: String},
    added: {type: Date, default: Date.now()},
    state: {type: String, enum: ToDoStates.values(), default: ToDoStates.default()}
});

/* Creates a new model and exports it directly */
module.exports = mongoose.model('ToDo', ToDo);