const express = require('express');
const CartsController = require('../controllers/cartsController');

const router = express.Router();

const cartController = new CartsController();

router.get('/', cartController.getCart);
router.post('/add-item', cartController.addToCart);
router.delete('/remove-item/:itemId', cartController.removeFromCart);

module.exports = router;
