var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {
  var middleware = function(req, res, next) {
    // if (!req.user) {
    //   res.redirect('/');
    // } else {
    next();
    // }
  };

  var getIndex = function(req, res) {
    var url = 'mongodb://localhost:27017/libraryApp';

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');
      collection.find().toArray(function(err, results) {
        res.render('bookListView', {
          title: 'Books',
          nav: nav,
          books: results
        });
      });
    });
  };

  var getById = function(req, res) {
    var id = new ObjectId(req.params.id);
    var url = 'mongodb://localhost:27017/libraryApp';

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');
      collection.findOne({
        _id: id
      }, function(err, result) {
        bookService.getBookById(result.bookId, function(err, book) {
          result.book = book;
          res.render('bookView', {
            title: 'Books',
            nav: nav,
            book: result
          });
        });
      });
    });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    middleware: middleware
  };
};

module.exports = bookController;
