const express = require('express');
const TransactionsController = require('../controllers/transactionsController');

const router = express.Router();

const transactionController = new TransactionsController();

/**
 * @openapi
 * /transactions:
 *  get:
 *    tags:
 *    - Transactions
 *    summary: Get all transactions
 *    description: Get all transactions
 *    responses:
 *      200:
 *        description: A list of all transactions
 *        content:
 *          application/json:
 *              example:
 *                  - id: 1
 *                    user_id: 3
 *                    total: 435000
 *                    books:
 *                      - title: The Hobbit
 *                        quantity: 2
 *                    status: success
 *                    createdAt: 2024-07-16T14:14:45.000Z
 *                    updatedAt: 2024-07-16T14:14:45.000Z
 *      500:
 *        description: Internal Server Error
 *
 */
router.get('/', transactionController.getTransactions);

module.exports = router;
