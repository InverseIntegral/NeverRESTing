/**
 * Created by Inverse Integral on 15.10.2016.
 */
const mongoose = require('mongoose');
const ToDo = require('./ToDo');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    todos: [ToDo]
});

User.pre('save', function (next) {
    const user = this;

    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, (err, salt)  => {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

User.methods.comparePassword =  function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', User);