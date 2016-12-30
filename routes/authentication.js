const router = require('express').Router();
const User = require('../app/models/User');
const jwt = require('jwt-simple');
const secret = 'abc';

const newUser = new User({
    username: "admin",
    password: "test"
});

newUser.save(function(err) {
    if (err) {
        console.log(err);
    }
});

router.post('/authenticate', (req, res) => {
    const failureResponse = {success: false, message: 'Authentication failed'};

    User.findOne({
        username: req.body.username
    }, (err, user) => {

        if (err) throw err;

        if (!user) {
            res.json(failureResponse);
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.encode(user, secret);
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send(failureResponse);
                }
            });
        }
    });
});

module.exports = router;