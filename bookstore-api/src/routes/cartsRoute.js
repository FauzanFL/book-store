const express = require('express');
const CartsController = require('../controllers/cartsController');

const router = express.Router();

const cartController = new CartsController();

router.get('/', cartController.getCart);
router.get('/add', cartController.addToCart);
router.get('/remove/:id', cartController.removeFromCart);

module.exports = router;
