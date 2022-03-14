const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

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
    const { name, email, phone, user_type, password } = req.body;
    console.log("🚀 ~ file: users.js ~ line 21 ~ router.post ~ req.body", req.body)

    //validation
    if (!name || !email || !user_type || !phone || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // check for existing User 
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });
            const newUser = new User({
                name,
                email,
                phone,
                user_type,
                password
            });
            // newUser.save().then(users => res.json(users));
            //create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().
                        then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            phone: user.phone,
                                            email: user.email,
                                            user_type: user.user_type
                                        }
                                    });
                                });
                        }).catch(err => res.status(400).json(err));
                });
            });
        }).catch(err => res.status(400).json(err));
});

// @routes DELETE api/users
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(users => users.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(400).json({ success: false }));
});

module.exports = router;



