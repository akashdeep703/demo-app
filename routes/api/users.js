const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const bcrypt = require('bcryptjs');


// User Model
const User = require('../../models/Users');

// @routes GET api/users
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users));
});


// @routes POST api/users
router.post('/', (req, res) => {
    const { name, email, user_type, password } = req.body;

    //validation
    if (!name || !email || !user_type || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // check for existing User 
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });
            const newUser = new User({
                name,
                email,
                user_type,
                password
            });
            newUser.save().then(users => res.json(users));

            //create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err , hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().
                    then(user => {
                        res.json({
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                user_type : user.user_type
                            }
                        });
                    });
                });
            });

        });
});

// @routes DELETE api/users
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(users => users.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;



