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
}

module.exports = TransactionsController;
