const express = require('express');
const BooksController = require('../controllers/booksController');

const router = express.Router();

const bookController = new BooksController();

router.get('/', bookController.getAllBooks);
router.post('/order', bookController.orderBook);

module.exports = router;
