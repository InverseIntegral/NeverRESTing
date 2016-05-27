/**
 * Created by Inverse Integral on 26.05.2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDo = new Schema({
    name: { type: String}
});

module.exports = mongoose.model('ToDo', ToDo);