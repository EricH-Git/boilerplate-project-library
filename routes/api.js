/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require('../models/Books.js');
const mongoose = require('mongoose');

module.exports = function(app) {

  app.route('/api/books')
    .get(async function(req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const bookArr = await Book.find();
        res.json(bookArr);

      } catch (err) {
        res.json(err);

      }

    })

    .post(async function(req, res) {
      //response will contain new book object including atleast _id and title
      let title = req.body.title;
      try {
        const book = await new Book({ title });
        const error = await book.validateSync();
        const postedBook = await book.save();
        res.json({ '_id': postedBook._id, 'title': postedBook.title });
      } catch (err) {
        console.log(err.errors.title.message);
        res.send(err.errors.title.message || 'Error');
      }
    })

    .delete(async function(req, res) {
      //if successful response will be 'complete delete successful'
      try {
        const deleted = await Book.find().deleteMany();
        if (deleted.ok !== 1) {
          throw new Error('deletion failed')
        } else {
          res.send('complete delete successful');
        }
      } catch (err) {
        console.log(err);
        res.send(err.message);
      }
    });



  app.route('/api/books/:id')
    .get(async function(req, res) {
      //get book, json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let bookId = req.params.id;
      try {
        const bookData = await Book.find({ '_id': bookId });

        res.json(bookData);

      } catch (err) {
        console.log(err);
        res.send('no book exists');
      }
    })

    .post(async function(req, res) {
      //post comment and json res format same as .get
      let bookId = req.params.id;
      let comment = req.body.comment;
      try {
        if (!comment) { throw new Error('missing required field comment') };

        const theBook = await Book.findOneAndUpdate(
          { '_id': bookId },
          { $push: { comments: [comment] }, $inc: { commentcount: 1 } },
          { new: true });

        if (theBook === null) { throw new Error('no book exists') };
        
        res.json(theBook);

      } catch (err) {
        console.log(err);
        
        if (err.name === 'CastError') { return res.status(400).send('no book exists')};
        
        res.status(400).send(err.message);
      
      }
    })

    .delete(async function(req, res) {
      // if successful response will be 'delete successful'
      let bookId = req.params.id;
      
      try {
        const rmBook = await Book.findOneAndRemove({ '_id': bookId });
        if (rmBook === null) { throw new Error('no book exists') };
        console.log(rmBook);
        res.send('delete successful');

      } catch (err) {
        console.log(err);
        if (err.name === 'CastError') { return res.status(400).send('no book exists')};
        res.status(200).send('no book exists');
        res.status(400).send(err.message);
      }
    });

};