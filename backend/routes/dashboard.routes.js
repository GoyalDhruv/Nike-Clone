import express from 'express';
const router = express.Router();
import { authAdminMiddleware } from "../middlewares/authenicateAdmin.js";
import { createProduct, deleteProductById, getAllOrders, getAllProducts, getAllUsers, getDashboard, updateProductById } from '../controllers/dashboard.controller.js';

router.get('/dashboardHome', authAdminMiddleware, getDashboard)
router.get('/getAllProducts', authAdminMiddleware, getAllProducts)
router.post('/createProduct', authAdminMiddleware, createProduct)
router.patch('/updateProduct/:id', authAdminMiddleware, updateProductById)
router.delete('/deleteProduct/:id', authAdminMiddleware, deleteProductById)
router.get('/getAllUsers', authAdminMiddleware, getAllUsers)
router.get('/getAllOrders', authAdminMiddleware, getAllOrders)

export default router