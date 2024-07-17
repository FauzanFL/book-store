const { Book, Transaction } = require('../models');

class BooksController {
  async getAllBooks(req, res) {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async orderBook(req, res) {
    const { book_id, total, quantity } = req.body;
    try {
      const book = await Book.findByPk(book_id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      } else if (book.stock < quantity) {
        return res.status(400).json({ message: 'Not enough stock' });
      }

      await book.update({ stock: book.stock - quantity });

      await Transaction.create({
        user_id: req.session.user.id,
        total,
        books: JSON.stringify([{ title: book.title, quantity }]),
        status: 'success',
      });

      res.status(200).json({ message: 'Book ordered' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BooksController;
