const express = require('express');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const router = express.Router();
const auth = require('../../middleware/auth');
// Books Model
const Books = require('../../models/Books');

// @routes GET api/Books
router.get('/:userid', (req, res) => {
    var sort = { bookname: -1 };
    Books.find({ user_id: req.params.userid }).sort(sort)
        .then(books => res.json(books));
});
// @routes POST api/books
router.post('/', auth, (req, res) => {
    console.log("🚀 ~ file: books.js ~ line 17 ~ router.post ~ req", req)
    const { user_id, bookname, authorname, quantity, price, filename } = req.body;
    //validation
    if (!user_id || !bookname || !authorname || !quantity || !price) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    if (!filename) {
        filename = "";
    } else {
        const newpath = appDir + "/uploads/";
        console.log("🚀 ~ file: books.js ~ line 32 ~ req.files ~ req.files", req.files)
        req.files.mv(`${newpath}${filename}`, (err) => {
            if (err) {
                res.status(500).send({ message: "File upload failed", code: 200 });
            }
            res.status(200).send({ message: "File Uploaded", code: 200 });
        });
    }
    const newBook = new Books({
        user_id,
        bookname,
        authorname,
        quantity,
        price,
        filename
    });
    newBook.save().then(books => res.json(books));
});
// @routes Get api/books
router.get('/singlebook/:id', (req, res) => {
    Books.findById(req.params.id)
        .then(books => res.json({ books }))
        .catch(err => res.status(400).json({ success: false }));
});
// @routes POST api/books
router.post('/:id', auth, (req, res) => {
    Books.findById(req.params.id)
        .then(books => {
            const { bookname, authorname, quantity, price } = req.body;
            //validation
            if (!bookname || !authorname || !quantity || !price) {
                return res.status(200).json({ msg: 'Please enter all fields' });
            }
            var newvalues = { $set: { bookname: bookname, authorname: authorname, quantity: quantity, price: price } };
            books.updateOne(newvalues)
                .then(() => res.json({ books }))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
// @routes Search api/books
router.get('/search/:key', (req, res) => {
    Books.find(
        {
            "$or": [
                { bookname: { $regex: new RegExp("^" + req.params.key.toLowerCase(), "i") } },
                { authorname: { $regex: new RegExp("^" + req.params.key.toLowerCase(), "i") } }
            ]
        }
    ).then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' + err));
});
// @routes DELETE api/books
router.delete('/:id', auth, (req, res) => {
    Books.findById(req.params.id)
        .then(books => books.remove()
            .then(() => res.json({ success: true }))
            .catch(err => res.status(404).json({ success: false }))
        ).catch(err => res.status(404).json({ success: false }))
});
module.exports = router;
