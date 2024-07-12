const { Book } = require('../models');

class BooksController {
  async getAllBooks(req, res) {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BooksController;
