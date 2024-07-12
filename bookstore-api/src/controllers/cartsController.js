const { Book, Cart, CartItem } = require('../models');

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
          attributes: ['id', 'book_id', 'quantity'],
          include: {
            model: Book,
            attributes: ['id', 'title', 'price'],
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
      } else if (book.stock < quantity) {
        return res.status(400).json({ message: 'Not enough stock' });
      }
      const cartItem = await CartItem.findOne({
        where: { cart_id: cart.id, book_id },
      });

      if (cartItem) {
        await cartItem.update({
          quantity: cartItem.quantity + quantity,
        });
        return res.status(200).json({ message: 'Cart item updated' });
      }

      await CartItem.create({
        cart_id: cart.id,
        book_id,
        quantity,
      });

      await book.update({ stock: book.stock - quantity });
      res.status(201).json({ message: 'Cart item added' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeFromCart(req, res) {
    const { id } = req.params;
    try {
      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        res.status(404).json({ message: 'Cart item not found' });
      }
      await cartItem.destroy();
      res.status(200).json({ message: 'Cart item removed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CartsController;
