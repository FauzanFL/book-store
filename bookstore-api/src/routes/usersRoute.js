const express = require('express');
const UsersController = require('../controllers/usersController');

const router = express.Router();

const userController = new UsersController();

/**
 * @openapi
 * /users:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get all users
 *    description: Get all users
 *    responses:
 *      200:
 *        description: A list of all users
 *        content:
 *          application/json:
 *            example:
 *              - id: 1
 *                name: John Doe
 *                username: johndoe
 *                password: $2b$10$sLscgYsOJpzb2YiEANhXhurwGyAve7frriKpRlfXJkHhmYZbggyU6
 *                createdAt: 2024-07-11T14:55:47.000Z
 *                updatedAt: 2024-07-11T14:55:47.000Z
 *      500:
 *        description: Internal Server Error
 *
 */
router.get('/', userController.getAllUsers);

/**
 * @openapi
 * /users/login:
 *  post:
 *    tags:
 *    - Users
 *    summary: get authenticated
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Login Successful
 *      404:
 *        description: User Not Found
 *      401:
 *        description: Invalid Password
 *      500:
 *        description: Internal Server Error
 *
 */
router.post('/login', userController.login);

/**
 * @openapi
 * /users/logout:
 *  get:
 *    tags:
 *    - Users
 *    responses:
 *      200:
 *        description: Logout Successful
 *      500:
 *        description: Error Logging out
 *
 */
router.get('/logout', userController.logout);

/**
 * @openapi
 * /users/isLogin:
 *  get:
 *    tags:
 *    - Users
 *    summary: checking authenticated user
 *    responses:
 *      200:
 *        description: User has logged in
 *      401:
 *        description: Unauthorized
 *
 */
router.get('/isLogin', userController.isLogin);

module.exports = router;
