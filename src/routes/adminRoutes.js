var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
    title: 'War and Peace',
    genre: 'Historical Fictioin',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fictioin',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false
  },
  {
    title: '1001 Nights',
    genre: 'Fictioin',
    author: 'Unknown',
    read: false
  },
  {
    title: 'Red and Black',
    genre: 'Historical Fictioin',
    author: 'Unknown',
    read: false
  },
  {
    title: 'Old Man and Sea',
    genre: 'Fiction',
    author: 'Ernst Hemingway',
    read: false
  }
];

var router = function(nav) {
  adminRouter.route('/addBooks')
    .get(function(req, res) {
      var url = 'mongodb://localhost:27017/libraryApp';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.insertMany(books, function(err, results) {
          res.send(results);
          db.close();
        });
      });
    });

  adminRouter.route('/')
    .get(function(req, res) {
      res.send('admin page...');
    });
  return adminRouter;
};

module.exports = router;
