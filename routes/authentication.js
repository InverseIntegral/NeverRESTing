const router = require('express').Router();
const User = require('../app/models/User');
const jwt = require('jwt-simple');

router.post('/authenticate', (req, res) => {
    const {username, password} = req.body;
    const failure = {success: false, message: 'Authentication failed'};

    User.findOne({
        username
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.json(failure);
        } else {
            user.comparePassword(password, (err, isMatch) =>{
                if (isMatch && !err) {
                    const token = jwt.encode({
                        id: user._id,
                        expires: Date.now() + 600000
                    }, process.env.JWT_SECRET);

                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send(failure);
                }
            });
        }
    });
});

module.exports = router;