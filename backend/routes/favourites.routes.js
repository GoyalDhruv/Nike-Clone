import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middlewares/authenticate.js';
import { addToFavorites, getFavorites, removeFromFavorites } from '../controllers/favourites.controller.js';

router.post('/addFavorite/:id', authMiddleware, addToFavorites);
router.get('/getFavorites', authMiddleware, getFavorites);
router.delete('/deletefavorite/:id', authMiddleware, removeFromFavorites);

export default router