const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema 

const BooksSchema = new Schema({
    bookname:{
        type: String,
        required: true
    },
    authorname: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },    
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Books = mongoose.model('books' , BooksSchema);
