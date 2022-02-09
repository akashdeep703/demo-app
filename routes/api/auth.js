const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/Users');
const req = require('express/lib/request');

// @routes POST api/auth
router.post('/', (req, res) => {
    const { email,password } = req.body;

    //validation
    if (!email || !password) {
        return res.status(400).json({ 200: 'Please enter all fields' });
    }

    // check for existing User 
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ 200: 'User does not exists' });           
            
            //validate password 

            bcrypt.compare(password, user.password).
            then(isMatch => {
                if(!isMatch) return res.status(400).json({200 : 'Invalid Credentials'});

                jwt.sign(
                    { id: user.id},
                    config.get('jwtSecret'),
                    { expiresIn : 3600},
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                user_type : user.user_type
                            }
                        });
                    }
                )
            });

        });
});

// @routes GET api/auth/user

router.get('/user', auth ,(req, res) => {
    User.findById(req.user.id).
    select('-password')
    .then(user => res.json(user))
});


module.exports = router;



