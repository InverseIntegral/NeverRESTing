/**
 * Created by Inverse Integral on 26.05.2016.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Defines the database schema of this entity */
const ToDo = new Schema({
    text: {type: String},
    added: {type: Date, default: Date.now()},
    active: {type: Boolean, default: true}
});

module.exports = ToDo;