const express = require('express');
const BooksController = require('../controllers/booksController');

const router = express.Router();

const bookController = new BooksController();

router.get('/', bookController.getAllBooks);

module.exports = router;
