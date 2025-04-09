import express from 'express';
const router = express.Router();
import { authAdminMiddleware } from "../middlewares/authenicateAdmin.js";
import { createProduct, deleteProductById, getAllProducts, updateProductById } from '../controllers/dashboard.controller.js';

router.get('/getAllProducts', authAdminMiddleware, getAllProducts)
router.post('/createProduct', authAdminMiddleware, createProduct)
router.patch('/updateProduct/:id', authAdminMiddleware, updateProductById)
router.delete('/deleteProduct/:id', authAdminMiddleware, deleteProductById)

export default router