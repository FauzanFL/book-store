const { Transaction } = require('../models');

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

  async addTransaction(req, res) {
    try {
      const { total } = req.body;
      const user = req.session.user;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      await Transaction.create({
        user_id: user.id,
        total,
        status: 'success',
      });
      res.status(201).json({ message: 'Transaction created' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BooksController;
