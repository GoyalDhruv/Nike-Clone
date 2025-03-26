import express from "express";
import { authMiddleware } from "../middlewares/authenticate.js";
import { createOrder, getAllOrdersByUser, getOrderById } from "../controllers/orders.controller.js";
const router = express.Router();

router.post("/createOrder", authMiddleware, createOrder);
router.get("/getAllOrdersByUser", authMiddleware, getAllOrdersByUser);
router.get("/getOrderById/:orderId", getOrderById);

export default router;
