import { sendOrderConfirmationEmail } from "../config/sendgrid.js";
import Order from "../models/orders.model.js";

export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products in the order" });
        }

        const order = new Order({
            user: req.user.userId,
            products,
            totalAmount,
            paymentStatus: "paid",
        });

        await order.save();

        await sendOrderConfirmationEmail(req.user.email, order);

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to create order", error });
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error });
    }
}