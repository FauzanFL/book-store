const express = require('express');
const TransactionsController = require('../controllers/transactionsController');

const router = express.Router();

const transactionController = new TransactionsController();

router.get('/', transactionController.getTransactions);
router.post('/add', transactionController.addTransaction);

module.exports = router;
