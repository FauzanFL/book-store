const express = require('express');
const BooksController = require('../controllers/booksController');

const router = express.Router();

const bookController = new BooksController();

/**
 * @openapi
 * /books:
 *  get:
 *    tags:
 *    - Books
 *    summary: Get all books
 *    description: Get all books
 *    responses:
 *      200:
 *        description: A list of all books
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
router.get('/', bookController.getAllBooks);

/**
 * @openapi
 * /transactions/order:
 *  post:
 *    tags:
 *    - Transactions
 *    summary: Get all transactions
 *    description: Get all transactions
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              book_id:
 *                type: integer
 *              total:
 *                type: integer
 *              quantity:
 *                type: integer
 *    responses:
 *      200:
 *        description: Order book success
 *      404:
 *        description: Book not found
 *      400:
 *        description: Not enough stock
 *      500:
 *        description: Internal Server Error
 *
 */
router.post('/order', bookController.orderBook);

module.exports = router;
