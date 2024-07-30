const Midtrans = require('midtrans-client');
const { Book, Cart, CartItem, Transaction } = require('../models');
require('dotenv').config({ path: __dirname + '/../../.env' });

class TransactionsController {
  async getTransactions(req, res) {
    try {
      const user = req.session.user;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const transactions = await Transaction.findAll({
        where: { user_id: user.id },
      });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async processTransaction(req, res) {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const snap = new Midtrans.Snap({
        isProduction: false,
        serverKey: process.env.SECRET,
        clientKey: process.env.CLIENT_KEY,
      });

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

      const total = cart.items.reduce((num, item) => {
        return num + item.quantity * item.book.price;
      }, 0);

      const transaction = await Transaction.create({
        user_id: user.id,
        total,
        books: JSON.stringify(books),
        status: 'pending',
      });

      const parameter = {
        // item_details: {
        //   name: productName,
        //   price: price,
        //   quantity: quantity,
        // },
        transaction_details: {
          order_id: transaction.id,
          gross_amount: total,
        },
        customer_details: {
          first_name: user.username,
        },
      };

      const token = await snap.createTransactionToken(parameter);

      if (token) {
        await CartItem.destroy({ where: { cart_id: cart.id } });
      }
      res.status(200).json({ id: transaction.id, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = TransactionsController;
