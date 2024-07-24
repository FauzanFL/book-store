const { Book, Cart, CartItem, Transaction } = require('../models');

class CartsController {
  async getCart(req, res) {
    try {
      const user = req.session.user;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const cart = await Cart.findOne({
        where: { user_id: user.id },
        attributes: ['id', 'user_id'],
        include: {
          model: CartItem,
          as: 'items',
          attributes: ['id', 'book_id', 'quantity'],
          include: {
            model: Book,
            attributes: ['id', 'title', 'price', 'author', 'image'],
            as: 'book',
          },
        },
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addToCart(req, res) {
    const { book_id, quantity } = req.body;
    const quantityInt = parseInt(quantity);
    if (isNaN(quantityInt)) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const cart = await Cart.findOne({ where: { user_id: user.id } });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const book = await Book.findByPk(book_id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      } else if (book.stock < quantityInt) {
        return res.status(400).json({ message: 'Not enough stock' });
      }
      const cartItem = await CartItem.findOne({
        where: { cart_id: cart.id, book_id },
      });

      if (cartItem) {
        await cartItem.update({
          quantity: cartItem.quantity + quantityInt,
        });
        return res.status(200).json({ message: 'Cart item updated' });
      }

      await CartItem.create({
        cart_id: cart.id,
        book_id,
        quantity,
      });

      await book.update({ stock: book.stock - quantityInt });
      res.status(201).json({ message: 'Cart item added' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeFromCart(req, res) {
    const { itemId } = req.params;
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const cartItem = await CartItem.findByPk(itemId);
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      const book = await Book.findByPk(cartItem.book_id);
      await book.update({ stock: book.stock + cartItem.quantity });
      await cartItem.destroy();
      res.status(200).json({ message: 'Cart item removed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async cartPaid(req, res) {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const cart = await Cart.findOne({
        where: { user_id: user.id },
        attributes: ['id', 'user_id'],
        include: {
          model: CartItem,
          as: 'items',
          attributes: ['id', 'book_id', 'quantity'],
          include: {
            model: Book,
            attributes: ['id', 'title', 'price', 'author', 'image'],
            as: 'book',
          },
        },
      });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const books = cart.items.map((item) => {
        return { title: item.book.title, quantity: item.quantity };
      });

      if (books.length === 0) {
        return res.status(400).json({ message: "Cart don't have any item" });
      }

      await CartItem.destroy({ where: { cart_id: cart.id } });

      const total = cart.items.reduce((num, item) => {
        return num + item.quantity * item.book.price;
      }, 0);

      await Transaction.create({
        user_id: user.id,
        total,
        books: JSON.stringify(books),
        status: 'success',
      });
      res.status(200).json({ message: 'Payment successfull' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CartsController;
