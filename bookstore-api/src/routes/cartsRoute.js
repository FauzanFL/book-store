const express = require('express');
const CartsController = require('../controllers/cartsController');

const router = express.Router();

const cartController = new CartsController();

/**
 * @openapi
 * /carts:
 *  get:
 *    tags:
 *    - Carts
 *    summary: Get cart from user
 *    description: Get cart from user
 *    responses:
 *      200:
 *        description: A cart from user
 *        content:
 *          application/json:
 *              example:
 *                  - id: 1
 *                    user_id: 3
 *                    items:
 *                      - id: 1
 *                        book_id: 1
 *                        quantity: 2
 *                        book:
 *                          id: 1
 *                          title: The Hobbit
 *                          price: 200000
 *                          author: C.S.S. Lewis
 *                          image: http://linktoimages.com
 *      500:
 *        description: Internal Server Error
 */
router.get('/', cartController.getCart);

/**
 * @openapi
 * /carts/add-item:
 *  post:
 *    tags:
 *    - Carts
 *    summary: Add item to cart
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              book_id:
 *                type: integer
 *              quantity:
 *                type: integer
 *    responses:
 *      201:
 *        description: Cart Item Added
 *      200:
 *        description: Cart Item Updated
 *      400:
 *        description: Invalid Quantity or Not Enough Stock
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Cart or Book Not Found
 *      500:
 *        description: Internal Server Error
 *
 */
router.post('/add-item', cartController.addToCart);

/**
 * @openapi
 * /carts/paid:
 *  post:
 *    tags:
 *    - Carts
 *    summary: Paid cart
 *    description: paid cart
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              transaction_id:
 *                type: integer
 *    responses:
 *      200:
 *        description: Cart Has Paid
 *      400:
 *        description: Cart Don't Have Any Item
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Cart Not Found
 *      500:
 *        description: Internal Server Error
 */
router.post('/paid', cartController.cartPaid);

/**
 * @openapi
 * /carts/remove-item/{id}:
 *  delete:
 *    tags:
 *    - Carts
 *    summary: Remove item from cart
 *    parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Cart Item Removed
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Cart item Not Found
 *      500:
 *        description: Internal Server Error
 *
 */
router.delete('/remove-item/:itemId', cartController.removeFromCart);

module.exports = router;
