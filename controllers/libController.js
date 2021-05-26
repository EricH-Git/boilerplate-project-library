
const LibController = function() {

  //  get book array
  this.getBooks = async function() {
    const bookArr = await Book.find();
    return bookArr;
  };
  
  // post book title
  this.postBook = async function(title) {
    const newTitle = title;
    const book = await new Book({
      title: newTitle
    });
    const error = await book.validateSync();
    const postedBook = await book.save();
    return { '_id': postedBook._id, 'title': postedBook.title };

  };

  // delete all books with 'complete delete successful'
  this.deleteLib = async function() {
    const booksDel = await Book.find().deleteMany();
    return booksDel;
  };

  // get book details by id
  this.getBookData = async function(bookId) {
    const bookData = await Book.find({ '_id': bookId });
    return bookData;
  };

  // post comment, return details
  this.postComment = async function(bookId, newComment) {
    if (!newComment) {
      throw new Error('missing required field comment');
    } else {
      const theBook = await Book.find({ '_id': bookId});
      console.log('updated book ---- ', theBook);
    };


  };

  // delete book with 'delete successful'
  this.deleteBook = function(bookId) {
    
  };

};

module.exports = LibController;