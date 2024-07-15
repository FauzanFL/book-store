const express = require('express');
const UsersController = require('../controllers/usersController');

const router = express.Router();

const userController = new UsersController();

router.get('/', userController.getAllUsers);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/isLogin', userController.isLogin);

module.exports = router;
