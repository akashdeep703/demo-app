const express = require('express');
const router = express.Router();

// Books Model
const Books = require('../../models/Books');

// @routes GET api/Books
router.get('/', (req, res) => {
    Books.find()
        .sort({ date: -1 })
        .then(books => res.json(books));
});
// @routes POST api/books
router.post('/', (req, res) => {
    const { bookname, authorname, quantity, price } = req.body;
    console.log("🚀 ~ file: books.js ~ line 16 ~ router.post ~ req.body", req.body)
    //validation
    if (!bookname || !authorname || !quantity || !price) {
        return res.status(200).json({ msg: 'Please enter all fields' });
    }

    // check for existing User 
    Books.find()
        .then(user => {
            const newBook = new Books({
                bookname,
                authorname,
                quantity,
                price
            });
            newBook.save().then(books => res.json(books));          
        });
});

// @routes DELETE api/bools
router.delete('/:id', (req, res) => {
    Books.findById(req.params.id)
        .then(books => books.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});
module.exports = router ;
