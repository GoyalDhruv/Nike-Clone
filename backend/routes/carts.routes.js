import express from 'express';
import { addToCart, deleteCartItem, getCart } from '../controllers/carts.controller.js';
import { authMiddleware } from '../middlewares/authenticate.js';
const router = express.Router()

router.post('/addToCart/:id', authMiddleware, addToCart)
router.get('/getCart', authMiddleware, getCart)
router.delete('/deleteCartItem/:id/:color', authMiddleware, deleteCartItem)

export default router;