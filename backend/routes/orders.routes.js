import express from "express";
import { authMiddleware } from "../middlewares/authenticate.js";
import { createOrder, getOrders } from "../controllers/orders.controller.js";
const router = express.Router();

router.post("/createOrder", authMiddleware, createOrder);
router.get("/getOrders", authMiddleware, getOrders);

export default router;
