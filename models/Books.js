const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookModule = new Schema({
  "comments": [ String ],
  "title": { type: String, required: [true, 'missing required field title'] },
  "commentcount": { type: Number, default: 0 }
});

const Book = mongoose.model('books', bookModule);

module.exports = Book;