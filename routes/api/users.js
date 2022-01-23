const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

// User Model
const User = require('../../models/Users');

// @routes GET api/users
router.get('/', (req, res) => {
    User.find()
    .sort({date: -1})
    .then(users => res.json(users));
});


// @routes POST api/users
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name        
    });
    newUser.save().then(users =>  res.json(users));
});

// @routes DELETE api/users
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(users => users.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success : false}));
});

module.exports = router;



